import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist(); // ✅ HERE
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await addToCart(product._id, 1);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleWishlist = async () => {
    try {
      await addToWishlist(product._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow flex flex-col relative">
      {/* ❤️ Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 text-red-500 text-xl hover:scale-110 transition"
      >
        ❤️
      </button>

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
      </Link>

      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-slate-600">{product.category}</p>
      <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>

      <div className="mt-4 flex gap-3">
        <button
          disabled={loading}
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 text-white py-2 rounded-full"
        >
          {loading ? "Adding..." : "Add To Cart"}
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
