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

    const cartIds = user.cart.map((id) => id.toString());
    for (const cartId of cartIds) {
      const cart = await Cart.findById(cartId).session(session);
      if (cart.product.toString() === productId) {
        await session.abortTransaction();
        return res.status(400).json({ message: 'Product already in cart' });
      }
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
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'User not found' });
    }

    const cartIds = user.cart.map(id => id.toString());
    for (const cartId of cartIds) {
      const cartItem = await Cart.findById(cartId).session(session);
      if (cartItem.product.toString() === productId) {
        user.cart.pull(cartItem.id);
        await user.save({ session });

        const deletedCartItem = await Cart.findByIdAndDelete(cartItem.id).session(session);
        if (!deletedCartItem) {
          await session.abortTransaction();
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        await session.commitTransaction();
        return res.status(204).end({ message: 'Product removed from cart' });
      }
    }

    await session.abortTransaction();
    return res.status(404).json({ message: 'Product not in your cart' });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return res.status(500).json({ type: error.name, message: error.message });
  } finally {
    session.endSession();
  }
};
