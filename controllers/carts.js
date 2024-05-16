const { User } = require('../models/user');
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { default: mongoose } = require('mongoose');

exports.getUserCart = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const cart = await Cart.find({ _id: { $in: user.cart } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.getUserCartCount = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json(user.cart.length);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.addToCart = async function (req, res) {
  const session = await mongoose.startSession();
  const userId = req.params.id;
  const { productId } = req.body;

  session.startTransaction();
  try {
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId).session(session);
    if (!product) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existingCartItem) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Product already in cart' });
    }

    const cart = await new Cart({
      product: productId,
      productName: product.name,
      productImage: product.image,
      productSaleOff: product.saleOff,
      productPrice: product.price,
    }).save({ session });

    if (!cart) {
      await session.abortTransaction();
      return res
        .status(500)
        .json({ message: 'The product could not added to your cart.' });
    }

    user.cart.push(cart.id);
    await user.save({ session });

    await session.commitTransaction();
    return res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return res.status(500).json({ type: error.name, message: error.message });
  } finally {
    await session.endSession();
  }
};

exports.removeFromCart = async function (req, res) {
  const session = await mongoose.startSession();
  const userId = req.params.id;
  const productId = req.params.productId;
  session.startTransaction();
  try {
    const user = await User.findById(userId);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.cart.includes(productId)) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Product not in your cart' });
    }

    const cartItemToRemove = await Cart.findById(
      productId
    );
    if (!cartItemToRemove) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Cart Item not found' });
    }

    user.cart.pull(cartItemToRemove.id);
    await user.save({ session });

    const cart = await Cart.findByIdAndDelete(
      cartItemToRemove.id
    ).session(session);

    if (!cart) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    await session.commitTransaction();
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return res.status(500).json({ type: error.name, message: error.message });
  } finally {
    await session.endSession();
  }
};
