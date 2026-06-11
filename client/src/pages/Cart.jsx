import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mappedCart = data
          .filter((item) => item.productId)
          .map((item) => ({
            cartId: item._id,
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
          }));

        setCartItems(mappedCart);
        localStorage.setItem("cart", JSON.stringify(mappedCart));
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch cart",
          text: error.response?.data?.message || "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [fetchCartCount, navigate]);

  const handleRemove = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      fetchCartCount();

      Swal.fire({
        icon: "success",
        title: "Item removed",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to remove item",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-sky-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-semibold">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-400">
            Cart is empty
          </div>
        ) : (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-950/20">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                <thead className="bg-slate-950">
                  <tr>
                    <th className="px-4 py-4 font-medium text-slate-400">
                      Product
                    </th>
                    <th className="px-4 py-4 font-medium text-slate-400">
                      Price
                    </th>
                    <th className="px-4 py-4 font-medium text-slate-400">
                      Quantity
                    </th>
                    <th className="px-4 py-4 font-medium text-slate-400">
                      Subtotal
                    </th>
                    <th className="px-4 py-4 font-medium text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {cartItems.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-950/80">
                      <td className="px-4 py-4 text-slate-100">{item.name}</td>
                      <td className="px-4 py-4 text-slate-100">
                        ₹{item.price}
                      </td>
                      <td className="px-4 py-4 text-slate-100">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-slate-100">
                        ₹{item.price * item.quantity}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleRemove(item.cartId)}
                          className="rounded-2xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20 md:flex-row md:items-center md:justify-between">
              <h4 className="text-xl font-semibold">Total: ₹{totalPrice}</h4>
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="rounded-3xl bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
