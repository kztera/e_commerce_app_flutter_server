const { default: mongoose, model } = require('mongoose');
const { Product } = require('../models/product');
const { Cart } = require('../models/cart');
const { OrderItem } = require('../models/order_item');
const { Order } = require('../models/order');
const { User } = require('../models/user');

exports.addOrder = async function (req, res) {
  try {
    // Lấy danh sách sản phẩm từ req.body
    const cartItems = req.body.cartItems;
    const cartItemIds = cartItems.map((item) => item.product);

    const products = await Product.find({ _id: { $in: cartItemIds } }).populate({
      path: 'author',
      model: 'Author',
      select: 'name',
    });
    if (products.length !== cartItems.length) {
      return res.status(400).json({ message: 'Sản phẩm không tồn tại' });
    }

    const productMap = {}
    products.forEach(product => {
      productMap[product.id] = product;
    });

    // Tạo các mục đơn hàng từ danh sách sản phẩm
    const orderItems = await Promise.all(
      cartItems.map(async (cartItem) => {
        const product = productMap[cartItem.product];
        const orderItem = new OrderItem({
          product: product.id,
          productAuthorName: product.author[0].name,
          productName: product.name,
          productImage: product.image,
          productPrice: product.price,
          productSaleOff: product.saleOff,
        });
        await orderItem.save();
        return orderItem._id;
      })
    );

    // Tạo đơn hàng mới
    const order = new Order({
      orderItems,
      email: req.body.email,
      totalPrice: req.body.totalPrice,
      user: req.body.userId,
    });
    await order.save();

    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi tạo đơn hàng' });
  }
};

exports.getUserOrders = async function (req, res) {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId })
      .populate({ path: 'orderItems' })
      .sort({ dateOrdered: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng' });
  }
};

exports.getOrderById = async function (req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          model: 'Product',
          populate: {
            path: 'author',
            model: 'Author',
            select: 'name',
          },
        }
      })
      .sort({ dateOrdered: -1 });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
