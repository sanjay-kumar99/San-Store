import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "https://ecommerce-api-nu2d.onrender.com/api/orders/myorders",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <p className="text-center my-10 text-slate-300">Loading orders...</p>
    );
  }

  return (
    <div className="mx-auto my-10 max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center text-3xl font-semibold text-amber-300">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-slate-400 text-lg">
          You have no orders yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-4xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20"
            >
              <header className="mb-4">
                <h3 className="text-lg font-semibold text-amber-300">
                  Order ID: {order._id}
                </h3>
              </header>
              <div className="space-y-3 text-slate-400">
                <p>
                  <span className="font-semibold text-slate-100">Status:</span>{" "}
                  <span
                    className={
                      order.status === "Delivered"
                        ? "text-emerald-400"
                        : order.status === "Shipped"
                          ? "text-sky-400"
                          : "text-amber-300"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-slate-100">
                    Total Price:
                  </span>{" "}
                  <span className="text-slate-100">
                    ₹{order.totalPrice.toFixed(2)}
                  </span>
                </p>
                <div>
                  <p className="mb-3 font-semibold text-slate-100">Items:</p>
                  <ul className="space-y-2">
                    {order.orderItems.map((item) => (
                      <li
                        key={item.product._id}
                        className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm"
                      >
                        <span>{item.product.name}</span>
                        <span className="font-semibold text-slate-100">
                          {item.qty} × ₹{item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-slate-500">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
