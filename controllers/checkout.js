const { User } = require('../models/user');
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order_item');
const { Cart } = require('../models/cart');
const emailSender = require('../helpers/email_sender');
const mailBuilder = require('../helpers/order_complete_email_builder');

exports.checkout = async function (req, res) {
  const { orderId, paymentData, message } = req.body;

  try {
    // Tìm order theo id
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Cập nhật trạng thái đơn hàng và thông tin thanh toán
    order.status = 'delivered';
    order.statusHistory.push('delivered');
    order.paymentId = paymentData.transId;
    await order.save();

    // Xóa cart của người dùng
    const user = await User.findById(order.user);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Xóa các bản ghi trong Cart
    const cartItemsToRemove = user.cart;
    await Cart.deleteMany({ _id: { $in: cartItemsToRemove } });

    // Xóa danh sách cart của người dùng
    user.cart = [];
    await user.save();

    // const leanOrder = order.toObject();
    // const orderItems = await OrderItem.find({ _id: { $in: order.orderItems } });
    // leanOrder["orderItems"] = orderItems

    // await emailSender.sendMail(
    //   user.email,
    //   'Thông tin đơn hàng',
    //   mailBuilder.buildEmail(
    //     user.name,
    //     leanOrder,
    //     paymentData
    //   )
    // );

    res.status(204).json({ message: 'Thanh toán thành công', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi thanh toán' });
  }
};