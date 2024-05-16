const { User } = require('../models/user');
const { Product } = require('../models/product');
const { default: mongoose } = require('mongoose');

exports.getUserWishlist = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const wishlist = [];
    for (const wishProduct of user.wishlist) {
      const product = await Product.findById(wishProduct.productId);
      wishlist.push({
        productId: product._id,
        productImage: product.image,
        productPrice: product.price,
        productName: product.name,
        productExists: product ? true : false,
      });
    }
    return res.json(wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.addToWishlist = async function (req, res) {
  const userId = req.params.id;
  const productId = req.body.productId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: 'Could not add product. Product not found.' });
    }

    const productAlreadyExists = user.wishlist.find((item) => {
      return item.productId.toString() === productId
    }
    );
    if (productAlreadyExists) {
      return res
        .status(409)
        .json({ message: 'Product already exists in wishlist' });
    }

    user.wishlist.push({
      productId: productId,
      productImage: product.image,
      productPrice: product.price,
      productName: product.name,
    });

    await user.save();
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.removeFromWishlist = async function (req, res) {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.wishlist.findIndex((item) => {
      return item.productId.toString() === productId
    });

    if (index === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }
    user.wishlist.splice(index, 1);

    await user.save();
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
