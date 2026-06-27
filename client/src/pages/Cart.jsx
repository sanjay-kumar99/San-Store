// src/pages/Cart.jsx
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeItem, updateQty } = useCart();
  const navigate = useNavigate();

  const safeCart = cartItems || [];

  const totalItems = safeCart.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0,
  );

  const totalPrice = safeCart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * (item.quantity || 0),
    0,
  );

  return (
    <section className="min-h-screen bg-[#f5f7fa] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <h2 className="text-4xl font-bold text-center mb-10 text-slate-900 flex items-center justify-center gap-3">
          <FaShoppingCart className="text-blue-600" />
          Your Cart
        </h2>

        {safeCart.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow text-center">
            <p className="text-lg text-slate-600">Your cart is empty 🛒</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-5">
              {safeCart
                .filter((item) => item.productId)
                .map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-6 shadow hover:shadow-lg transition"
                  >
                    {/* IMAGE */}
                    <img
                      src={item.productId?.images?.[0] || "/placeholder.png"}
                      className="h-24 w-24 object-contain"
                      alt={item.productId?.name}
                    />

                    {/* INFO */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item.productId?.name}
                      </h3>

                      <p className="text-blue-600 font-bold mt-1">
                        ₹{item.productId?.price}
                      </p>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-sm text-slate-600">Qty:</span>

                        <input
                          type="number"
                          min="1"
                          value={item.quantity || 1}
                          onChange={(e) =>
                            updateQty(item._id, Number(e.target.value))
                          }
                          className="w-16 px-2 py-1 border rounded-lg text-center"
                        />
                      </div>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-3xl p-8 shadow h-fit sticky top-20">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">
                Order Summary
              </h3>

              <div className="space-y-4 text-slate-700">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>

                <div className="flex justify-between text-lg">
                  <span>Total Price</span>
                  <span className="font-bold text-blue-600">₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-8 w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Secure checkout powered by SanStore
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
