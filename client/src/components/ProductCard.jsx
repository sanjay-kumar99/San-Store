/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product, isFeatured }) => {
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/cart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchCartCount();
      toast.success(`${product.name} added to cart`);
      navigate("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: "0px 0px 25px rgba(212,175,55,0.4)",
      }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-[1.5rem] border border-amber-300/20 bg-slate-950 text-slate-100 shadow-xl transition hover:-translate-y-1"
      style={{ background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)" }}
    >
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full"
            style={{
              height: isFeatured ? "260px" : "220px",
              objectFit: "cover",
            }}
          />
        </Link>

        <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1 text-sm font-semibold text-slate-950">
          ₹{product.price}
        </span>

        {product.isNew && (
          <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
            NEW
          </span>
        )}

        {product.onSale && (
          <span className="absolute right-4 top-12 rounded-full bg-yellow-300 px-2 py-1 text-xs font-semibold text-slate-950">
            SALE
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <Link to={`/product/${product._id}`} className="outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
          <h5
            className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-amber-300"
            title={product.name}
          >
            {product.name}
          </h5>
        </Link>

        <p className="min-h-[3rem] text-sm leading-6 text-slate-400">
          {product.description ? `${product.description.substring(0, 70)}...` : ""}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-2 rounded-3xl bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;