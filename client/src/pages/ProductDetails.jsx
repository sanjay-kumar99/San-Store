// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWishlist } from "../hooks/useWishlist";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../hooks/useCart"; // ✅ Cart context import
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { addToCart } = useCart(); // ✅ cart context
  const [loading, setLoading] = useState(false);
  const { addToWishlist } = useWishlist();
  const [wishLoading, setWishLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        setProduct(data);
        if (data.images?.length > 0) setMainImage(data.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Add to Cart Logic
  const handleAddToCart = async () => {
    if (loading || !product) return;

    setLoading(true);

    try {
      await addToCart(product._id, 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Buy Now Logic
  const handleBuyNow = async () => {
    try {
      await addToCart(product._id, 1);
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">
        Product Not Found
      </div>
    );
  }

  const handleWishlist = async () => {
    if (!product || wishLoading) return;

    setWishLoading(true);

    try {
      await addToWishlist(product._id);
    } catch (error) {
      console.log(error);
    } finally {
      setWishLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f7fa] py-20">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-start">
        {/* Product Images + Video */}
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

        {/* Product Info */}
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
            In stock ({product.countInStock} available)
          </p>

          {product.sizes?.length > 0 && (
            <div className="mt-6 flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <p className="mt-6 text-slate-700 leading-relaxed">
            {product.description}
          </p>

          {product.details && (
            <ul className="mt-4 space-y-2 text-slate-600">
              {Object.entries(product.details).map(([key, value]) => (
                <li key={key}>
                  • {key}: {value}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="px-8 py-4 rounded-full bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-500 transition shadow-lg"
            >
              Buy Now
            </button>

            {/* ❤️ Wishlist Button */}
            <button
              onClick={handleWishlist}
              disabled={wishLoading}
              className="px-6 py-4 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition flex items-center gap-2"
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
