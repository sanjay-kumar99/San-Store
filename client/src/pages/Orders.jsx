/* eslint-disable react-hooks/immutability */
// src/pages/Orders.jsx

import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/orders/myorders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-700">No Orders Yet</h2>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                {/* Top */}
                <div className="bg-slate-50 border-b px-8 py-5 flex flex-wrap justify-between gap-5">
                  <div>
                    <p className="text-gray-500 text-sm">ORDER PLACED</p>

                    <h3 className="font-bold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">TOTAL</p>

                    <h3 className="font-bold text-blue-600">
                      ₹{order.totalPrice}
                    </h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">PAYMENT</p>

                    <h3 className="font-bold">{order.paymentMethod}</h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">STATUS</p>

                    <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="p-8">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row justify-between gap-5 border-b py-5"
                    >
                      <div className="flex gap-5">
                        <img src={item.product?.image} />
                        <p>{item.product?.name}</p>

                        <div>
                          <h2 className="text-xl font-bold">
                            {item.product?.name}
                          </h2>

                          <p className="text-gray-500 mt-2">
                            Quantity : {item.qty}
                          </p>

                          <p className="text-gray-500">Price : ₹{item.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {order.status === "Delivered" ? (
                          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
                            Delivered
                          </span>
                        ) : (
                          <span className="bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-semibold">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
