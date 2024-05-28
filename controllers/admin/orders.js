const { Order } = require('../../models/order');
const { OrderItem } = require('../../models/order_item');
exports.getOrders = async function (req, res) {
  try {
    let orders;
    const page = req.query.page || 1;
    const pageSize = 10;
    
    orders = await Order.find()
      .select('-statusHistory')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ dateOrdered: -1 })
      .populate('user', 'name email')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          select: 'name',
          populate: { path: 'category', select: 'name' },
        },
      });
    if (!orders) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.getOrderById = async function (req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          populate: {
            path: 'category',
            select: 'name'
          },
        },
      });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
}

exports.getOrdersCount = async function (_, res) {
  try {
    const count = await Order.countDocuments();
    if (!count) {
      return res.status(500).json({ message: 'Could not count orders!' });
    }
    return res.json({ count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.changeOrderStatus = async function (req, res) {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    if (!order.statusHistory.includes(order.status)) {
      order.statusHistory.push(order.status);
    }
    order.status = newStatus;
    order = await order.save();
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.deleteOrder = async function (req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    for (const orderItemId of order.orderItems) {
      await OrderItem.findByIdAndDelete(orderItemId);
    }
    return res.status(204).json({ message: 'Order deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.deleteAllOrders = async function (_, res) {
  try {
    await Order.deleteMany({});
    await OrderItem.deleteMany({});
    return res.status(204).json({ message: 'All orders deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
}
