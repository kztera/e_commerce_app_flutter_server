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

    // Tạo các mục đơn hàng từ danh sách sản phẩm
    const orderItems = await Promise.all(
      cartItems.map(async (cartItem) => {
        const orderItem = new OrderItem({
          product: cartItem.product,
          productName: cartItem.productName,
          productImage: cartItem.productImage,
          productPrice: cartItem.productPrice,
          productSaleOff: cartItem.productSaleOff,
        });
        await orderItem.save();
        return orderItem._id;
      })
    );

    // Tính tổng giá trị đơn hàng
    const totalPrice = cartItems.reduce(
      (total, item) =>
        total + item.productPrice * (1 - item.productSaleOff / 100),
      0
    );

    // Tạo đơn hàng mới
    const order = new Order({
      orderItems,
      email: req.body.email,
      totalPrice,
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
