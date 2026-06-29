import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems = [] } = useCart();
  const { addToWishlist, wishlistItems = [] } = useWishlist();
  const { token } = useAuth();

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWish, setLoadingWish] = useState(false);

  const isOutOfStock = product.stock === 0;

  const isInCart = cartItems?.some((item) => item.productId === product._id);
  const isInWishlist = wishlistItems?.some(
    (item) => item.productId === product._id
  );

  const handleAddToCart = async () => {
    if (!token) {
      return toast.error("🔐 Please login to continue");
    }

    if (isOutOfStock) {
      return toast.error("❌ Product is out of stock");
    }

    if (isInCart) {
      return toast("⚠️ Already added to cart");
    }

    try {
      setLoadingCart(true);
      await addToCart(product._id);
      toast.success("🛒 Added to cart successfully");
    } catch (err) {
      toast.error("❌ Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  const handleWishlist = async () => {
    if (!token) {
      return toast.error("🔐 Please login to continue");
    }

    if (isInWishlist) {
      return toast("❤️ Already in wishlist");
    }

    try {
      setLoadingWish(true);
      await addToWishlist(product._id);
      toast.success("❤️ Added to wishlist");
    } catch (err) {
      toast.error("❌ Failed to add to wishlist");
    } finally {
      setLoadingWish(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col relative">
      
      {/* ❤️ Wishlist Button */}
      <button
        onClick={handleWishlist}
        disabled={loadingWish}
        className={`absolute top-3 right-3 text-xl transition ${
          isInWishlist ? "text-red-600" : "text-red-400"
        } hover:scale-110`}
      >
        {loadingWish ? "..." : "❤️"}
      </button>

      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="flex justify-center mb-4 relative"
      >
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="h-40 object-contain hover:scale-105 transition duration-300"
        />

        {product.videos?.length > 0 && (
          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            ▶ Video
          </span>
        )}

        {isOutOfStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </Link>

      {/* Details */}
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-slate-600">{product.category}</p>
      <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        
        <button
          onClick={handleAddToCart}
          disabled={loadingCart || isOutOfStock}
          className={`flex-1 py-2 rounded-full transition ${
            isOutOfStock
              ? "bg-gray-300 cursor-not-allowed"
              : isInCart
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loadingCart
            ? "Adding..."
            : isInCart
            ? "In Cart"
            : "Add to Cart"}
        </button>

        <Link
          to={`/product/${product._id}`}
          className="flex-1 bg-slate-200 text-slate-900 py-2 rounded-full text-center hover:bg-slate-300 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;