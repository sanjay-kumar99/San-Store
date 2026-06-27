/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    fullAddress: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const totalPrice = (cartItems || []).reduce((acc, item) => {
    const product = item.productId || item.product;
    return acc + (product?.price || 0) * (item.quantity || 1);
  }, 0);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        orderItems: cartItems.map((item) => {
          const product = item.productId || item.product;

          return {
            product: product?._id,
            qty: item.quantity,
            price: product?.price,
          };
        }),

        shippingAddress: {
          address: address.fullAddress,
          city: address.city,
          postalCode: address.pincode,
          country: "India",
        },

        paymentMethod,
        totalPrice,
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      clearCart();
      navigate("/orders");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f7fa] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-10 text-slate-900">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT - ADDRESS */}
          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>

            <div className="grid gap-4">
              <input
                name="name"
                placeholder="Full Name"
                className="w-full p-3 border rounded-xl focus:outline-blue-500"
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-xl"
                onChange={handleChange}
              />

              <input
                name="pincode"
                placeholder="Pincode"
                className="w-full p-3 border rounded-xl"
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="city"
                  placeholder="City"
                  className="w-full p-3 border rounded-xl"
                  onChange={handleChange}
                />

                <input
                  name="state"
                  placeholder="State"
                  className="w-full p-3 border rounded-xl"
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="fullAddress"
                placeholder="Full Address"
                className="w-full p-3 border rounded-xl"
                rows="4"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {(cartItems || []).map((item, index) => {
                const product = item.productId || item.product;

                return (
                  <div
                    key={index}
                    className="flex justify-between text-sm border-b pb-2"
                  >
                    <span className="text-slate-700">{product?.name}</span>

                    <span className="font-semibold text-blue-600">
                      ₹{(product?.price || 0) * (item.quantity || 1)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* TOTAL */}
            <div className="mt-6 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-blue-600">₹{totalPrice}</span>
            </div>

            {/* PAYMENT */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3">Payment Method</h3>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Card Payment
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="NetBanking"
                    checked={paymentMethod === "NetBanking"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Net Banking
                </label>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
            >
              Place Order (₹{totalPrice})
            </button>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Secure checkout • 100% safe payment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
