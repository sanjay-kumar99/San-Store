// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWishlist } from "../hooks/useWishlist";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(data);
        if (data.images?.length > 0) setMainImage(data.images[0]);
      } catch (error) {
        toast.error("❌ Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const isOutOfStock = product?.countInStock === 0;

  // 🛒 Add to Cart
  const handleAddToCart = async () => {
    if (!product || loading) return;

    if (!token) {
      return toast.error("🔐 Please login to add items to cart");
    }

    if (isOutOfStock) {
      return toast.error("❌ Product is out of stock");
    }

    try {
      setLoading(true);

      const toastId = toast.loading("Adding to cart...");

      await addToCart(product._id, 1);

      toast.success("🛒 Added to cart successfully", { id: toastId });
    } catch (error) {
      toast.error("❌ Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  // 💳 Buy Now
  const handleBuyNow = async () => {
    if (!token) {
      return toast.error("🔐 Please login first");
    }

    if (isOutOfStock) {
      return toast.error("❌ Product is out of stock");
    }

    try {
      const toastId = toast.loading("Processing...");

      await addToCart(product._id, 1);

      toast.success("Redirecting to checkout...", { id: toastId });

      navigate("/checkout");
    } catch (error) {
      toast.error("❌ Something went wrong");
    }
  };

  // ❤️ Wishlist
  const handleWishlist = async () => {
    if (!product || wishLoading) return;

    if (!token) {
      return toast.error("🔐 Please login to add wishlist");
    }

    try {
      setWishLoading(true);

      const toastId = toast.loading("Adding to wishlist...");

      await addToWishlist(product._id);

      toast.success("❤️ Added to wishlist", { id: toastId });
    } catch (error) {
      toast.error("❌ Failed to add wishlist");
    } finally {
      setWishLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">
        Loading Product...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f7fa] py-20">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-start">
        {/* Images */}
        <div>
          {mainImage && (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full rounded-lg shadow-lg object-contain"
            />
          )}

          <div className="flex gap-3 mt-4">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name}-${i}`}
                className="w-20 h-20 object-cover cursor-pointer border rounded"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          {product.videos?.length > 0 && (
            <div className="mt-6">
              <video
                controls
                className="w-full rounded-lg shadow-lg"
                src={product.videos[0]}
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500 text-lg">★ ★ ★ ★ ★</span>
            <p className="text-slate-600 text-sm">
              ({product.rating || 4.5}/5 • {product.numReviews || 100} reviews)
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="text-3xl font-semibold text-blue-600">
              ₹{product.price}
            </p>
            {product.oldPrice && (
              <p className="text-lg text-slate-500 line-through">
                ₹{product.oldPrice}
              </p>
            )}
          </div>

          <p className="mt-2 text-green-600 font-medium">
            {isOutOfStock
              ? "❌ Out of stock"
              : `In stock (${product.countInStock} available)`}
          </p>

          <p className="mt-6 text-slate-700 leading-relaxed">
            {product.description}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              disabled={loading || isOutOfStock}
              className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="px-8 py-4 rounded-full bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-500 transition shadow-lg disabled:opacity-50"
            >
              Buy Now
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              disabled={wishLoading}
              className="px-6 py-4 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition flex items-center gap-2 disabled:opacity-50"
            >
              <FaHeart />
              {wishLoading ? "Adding..." : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
