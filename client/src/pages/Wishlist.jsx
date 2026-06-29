import { useWishlist } from "../hooks/useWishlist";
import { FaTrash, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const items = Array.isArray(wishlistItems) ? wishlistItems : [];
  const handleRemove = async (id) => {
    await removeFromWishlist(id);
    toast.success("Removed from Wishlist");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-10 px-4">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaHeart className="text-red-500" />
          My Wishlist
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Your saved products in one place
        </p>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-10 text-center">
          <FaHeart className="text-4xl text-gray-300 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-gray-700">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mt-2">
            Save items you like to buy them later
          </p>
        </div>
      ) : (
        /* GRID */
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.product?.images?.[0] || "/placeholder.png"}
                  className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
                  alt={item.product?.name}
                />

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 p-2 rounded-full shadow transition"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="font-semibold text-gray-800 line-clamp-1">
                  {item.product?.name}
                </h2>

                <p className="text-blue-600 font-bold mt-2 text-lg">
                  ₹{item.product?.price}
                </p>

                <button className="mt-4 w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-2 rounded-xl hover:opacity-90 transition">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
