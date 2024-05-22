const { Order } = require('../../models/order');
const { Product } = require('../../models/product');
const { User } = require('../../models/user');
const dayjs = require('dayjs');

exports.getDashboard = async function (_, res) {
  const data = {};
  try {
    const totalRevenue = await Order.aggregate([
      {
      $match: { status: 'delivered' }
      },
      {
      $group: {
        _id: null,
        total: { $sum: '$totalPrice' },
      },
      },
    ]);
    data.totalRevenue = {};
    if (totalRevenue.length) {
      data.totalRevenue["amount"] = totalRevenue[0].total;
    } else {
      data.totalRevenue["amount"] = 0
    }

    const allOrders = await Order.find();
    const rangeDate = allOrders.map((order) => order.dateOrdered);
    const minDate = new Date(Math.min.apply(null, rangeDate));
    const maxDate = new Date(Math.max.apply(null, rangeDate));
    data.totalRevenue["rangeDate"] = `${dayjs(minDate).format('DD/MM/YYYY')} - ${dayjs(maxDate).format('DD/MM/YYYY')}`

    const totalUser = await User.countDocuments();
    const totalUserAddedMonth = await User.countDocuments({
      dateCreated: {
        $gte: new Date(dayjs().startOf('month').toISOString()),
        $lte: new Date(dayjs().endOf('month').toISOString()),
      },
    });
    data.totalUser = {};
    data.totalUser["amount"] = totalUser;
    data.totalUser["createdMonth"] = totalUserAddedMonth;

    const totalOrder = await Order.countDocuments();
    const toltalTodayOrder = await Order.countDocuments({
      dateOrdered: {
        $gte: new Date(dayjs().startOf('day').toISOString()),
        $lte: new Date(dayjs().endOf('day').toISOString()),
      },
    });
    data.totalOrder = {};
    data.totalOrder["amount"] = totalOrder;
    data.totalOrder["today"] = toltalTodayOrder;

    const totalProduct = await Product.countDocuments();
    const totalProductAddedMonth = await Product.countDocuments({
      dateAdded: {
        $gte: new Date(dayjs().startOf('month').toISOString()),
        $lte: new Date(dayjs().endOf('month').toISOString()),
      },
    });
    data.totalProduct = {};
    data.totalProduct["amount"] = totalProduct;
    data.totalProduct["addedMonth"] = totalProductAddedMonth;

    const overviewRevenue = await Order.aggregate([
      {
        $group: {
          _id: { $month: '$dateOrdered' },
          total: { $sum: '$totalPrice' },
        },
      },
    ]);
    const months = [
      "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"
    ]
    data.overviewRevenue = months.map((month, index) => {
      const monthData = overviewRevenue.find((item) => item._id === index + 1);
      return {
        name: month,
        total: monthData ? monthData.total : 0,
      };
    });

    const latestOrder = await Order.find()
      .select('totalPrice')
      .populate('user', 'name email')
      .sort({ dateOrdered: -1 })
      .limit(5);
    
    data.lastestOrder = latestOrder.map((item) => {
      return {
        name: item.user.name,
        email: item.user.email,
        orderPrice: item.totalPrice,
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};