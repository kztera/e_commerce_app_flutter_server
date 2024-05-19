const { Order } = require('../../models/order');
const { Product } = require('../../models/product');
const { User } = require('../../models/user');

exports.getDashboard = async function (_, res) {
  // totalRevenue: ,
	// totalUser: ,
	// totalOrder: ,
	// totalProduct: ,
	// overviewRevenue: [
	// 	{
	// 		name: "Tên tháng" // T1,
	// 		total: "Tiền"
	// 	}
	// ],
	// lastestOrder: [ // mảng chỉ 5 objects
	// 	{
	// 		name: 'Olivia Martin',
	// 	    email: 'olivia.martin@email.com',
	// 		orderPrice: 223000
	// 	}
	// ]
  const data = {};
  try {
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);
    if (totalRevenue.length) {
      data.totalRevenue = totalRevenue[0].total;
    } else {
      data.totalRevenue = 0;
    }    

    const totalUser = await User.countDocuments();
    data.totalUser = totalUser;

    const totalOrder = await Order.countDocuments();
    data.totalOrder = totalOrder;

    const totalProduct = await Product.countDocuments();
    data.totalProduct = totalProduct;

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
    // data.overviewRevenue = overviewRevenue.map((item) => {
    //   return {
    //     name: item._id,
    //     total: item.total,
    //   };
    // });

    const lastestOrder = await Order.find()
      .select('totalPrice')
      .populate('user', 'name email')
      .sort({ dateOrdered: -1 })
      .limit(5);
    
    data.lastestOrder = lastestOrder.map((item) => {
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