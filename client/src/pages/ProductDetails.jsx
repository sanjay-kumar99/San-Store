/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItemId, setCartItemId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: productData } = await axios.get(
          `https://ecommerce-api-nu2d.onrender.com/api/products/${id}`,
        );
        setProduct(productData);

        if (token) {
          const { data: cartData } = await axios.get(
            "https://ecommerce-api-nu2d.onrender.com/api/cart",
            { headers: { Authorization: `Bearer ${token}` } },
          );

          const existingItem = cartData.find(
            (item) => item.productId._id === productData._id,
          );

          if (existingItem) {
            setQuantity(existingItem.quantity);
            setCartItemId(existingItem._id);
          }
        }
      } catch (error) {
        Swal.fire("Error", "Failed to load product", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleAddToCart = async () => {
    if (!token) {
      Swal.fire("Login Required", "Please login first", "warning");
      navigate("/login");
      return;
    }

    try {
      if (cartItemId) {
        await axios.put(
          `https://ecommerce-api-nu2d.onrender.com/api/cart/${cartItemId}`,
          { quantity },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        Swal.fire("Updated", "Cart updated successfully", "success");
      } else {
        const { data } = await axios.post(
          "https://ecommerce-api-nu2d.onrender.com/api/cart",
          { productId: product._id, quantity },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setCartItemId(data._id);
        Swal.fire("Added", "Product added to cart", "success");
      }

      fetchCartCount();
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-amber-300">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-amber-300 my-20">Product not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-4xl border border-amber-400/10 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] bg-slate-950 p-5 text-center shadow-lg shadow-slate-950/30">
            <div className="inline-flex overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <img
                src={`https://ecommerce-api-nu2d.onrender.com${product.image}`}
                alt={product.name}
                className="h-80 w-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-semibold text-amber-300">
                {product.name}
              </h2>
              <p className="mt-4 text-slate-400 leading-7">
                {product.description}
              </p>
              <p className="mt-6 text-3xl font-bold text-slate-100">
                ₹{product.price}
              </p>
            </div>

            <div className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    className="rounded-2xl bg-amber-300 px-4 py-2 text-black transition hover:bg-amber-200"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-slate-100">
                    {quantity}
                  </span>
                  <button
                    className="rounded-2xl bg-amber-300 px-4 py-2 text-black transition hover:bg-amber-200"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="w-full rounded-3xl bg-amber-300 px-6 py-3 text-lg font-semibold text-slate-950 transition hover:bg-amber-200"
                onClick={handleAddToCart}
              >
                {cartItemId ? "Update Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
