import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://ecommerce-api-nu2d.onrender.com/api/cart",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const mappedCart = data.map((item) => ({
        _id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      }));

      setCartItems(mappedCart);
      setTotalPrice(
        mappedCart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      );
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!cartItems || cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          qty: item.quantity,
          price: item.price,
        })),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice,
      };

      await axios.post(
        "https://ecommerce-api-nu2d.onrender.com/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
      setTotalPrice(0);
      navigate("/myorders");
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-16 text-slate-100">
      <div className="mx-auto max-w-xl rounded-4xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
        <h2 className="text-center text-3xl font-semibold mb-8">Checkout</h2>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Address
            </label>
            <input
              type="text"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                City
              </label>
              <input
                type="text"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Postal Code
              </label>
              <input
                type="text"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Country
            </label>
            <input
              type="text"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Payment Method
            </label>
            <select
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-5 text-slate-100">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-slate-100">
                  Total Items:
                </span>{" "}
                {cartItems.length}
              </p>
              <p>
                <span className="font-semibold text-slate-100">
                  Total Price:
                </span>{" "}
                ₹{totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full rounded-3xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
