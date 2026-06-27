import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

// GET /api/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json({
      products,
      users,
      orders,
      revenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};