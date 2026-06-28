/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";
import { API_URL } from "../../config";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStats(data);
    } catch (err) {
      console.log("Dashboard error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: <FaBox />,
      bg: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: <FaUsers />,
      bg: "from-green-500 to-emerald-600",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <FaShoppingCart />,
      bg: "from-red-500 to-pink-600",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: <FaMoneyBillWave />,
      bg: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-sm sm:text-base text-slate-500">
            Welcome back. Here's an overview of your store.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-linear-to-r ${card.bg}
              rounded-2xl
              p-5
               sm:p-6
             text-white
            shadow-md
            hover:shadow-2xl
            hover:-translate-y-1
             transition-all
              duration-300`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs sm:text-sm opacity-90"></p>

                  <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div className="text-4xl sm:text-5xl opacity-20">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-8 mt-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
            <h2 className="text-lg sm:text-xl font-bold mb-5 text-slate-800">
              Recent Activity
            </h2>

            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <p className="font-medium">New Order Received</p>
                <span className="text-sm text-gray-500">2 minutes ago</span>
              </div>

              <div className="border-b pb-3">
                <p className="font-medium">New User Registered</p>
                <span className="text-sm text-gray-500">15 minutes ago</span>
              </div>

              <div>
                <p className="font-medium">Product Added</p>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>

          {/* Store Summary */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-5">Store Summary</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span>Total Products</span>
                <span className="font-semibold">{stats.products}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Users</span>
                <span className="font-semibold">{stats.users}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Orders</span>
                <span className="font-semibold">{stats.orders}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Revenue</span>
                <span className="font-bold text-green-600">
                  ₹{stats.revenue}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
