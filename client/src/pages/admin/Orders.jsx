/* eslint-disable react-hooks/set-state-in-effect */

// src/pages/admin/AdminOrders.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    await axios.delete(`${API_URL}/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchOrders();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Orders
        </h1>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium w-fit">
          Total Orders : {orders.length}
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr className="h-14">
              <th className="px-4">User</th>
              <th className="px-4">Total</th>
              <th className="px-4">Status</th>
              <th className="px-4">Delete</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="text-center border-b h-20 hover:bg-slate-50"
              >
                <td>{order.user?.name}</td>

                <td className="font-semibold">₹{order.totalPrice}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded-lg p-2"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-lg">{order.user?.name}</h2>

            <p className="mt-2">
              <span className="font-semibold">Total:</span> ₹{order.totalPrice}
            </p>

            <div className="mt-3">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>

            <button
              onClick={() => deleteOrder(order._id)}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
