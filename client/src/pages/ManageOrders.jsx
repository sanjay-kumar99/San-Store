import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: data.status,
                isDelivered: data.isDelivered,
                deliveredAt: data.deliveredAt,
              }
            : order,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://ecommerce-api-nu2d.onrender.com/api/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
    }
  };

  if (loading) {
    return <p className="text-center my-5 text-slate-300">Loading orders...</p>;
  }

  return (
    <div className="mx-auto my-10 max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-center text-3xl font-semibold text-amber-300">
        Manage Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-slate-400 text-lg">No orders found.</p>
      ) : (
        <div className="overflow-hidden rounded-4xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/20">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Total Price</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-slate-950/70 transition hover:bg-slate-900"
                >
                  <td className="px-6 py-4 align-top">{order._id}</td>
                  <td className="px-6 py-4 align-top">
                    {order.user.name}{" "}
                    <span className="text-slate-500">({order.user.email})</span>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 align-top">
                    ₹{order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 align-top">
                    <ul className="space-y-2 text-slate-400">
                      {order.orderItems.map((item) => (
                        <li key={item.product._id}>
                          {item.product.name} - {item.qty} × ₹{item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <button
                      className="rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
