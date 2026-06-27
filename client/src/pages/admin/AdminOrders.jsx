/* eslint-disable react-hooks/set-state-in-effect */

// src/pages/admin/AdminOrders.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders", {
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
    await axios.delete(`http://localhost:5000/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchOrders();
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <table className="w-full">
        <thead>
          <tr className="border-b h-14">
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center border-b h-16">
              <td>{order.user?.name}</td>

              <td>₹{order.totalPrice}</td>

              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border p-2 rounded"
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
                  className="bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
