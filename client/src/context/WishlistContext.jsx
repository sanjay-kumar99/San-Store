/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("token");

  const fetchWishlist = async () => {
    if (!token) return;

    const { data } = await axios.get("http://localhost:5000/api/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setWishlist(data);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchWishlist();
    }
  }, []);
  const addToWishlist = async (productId) => {
    await axios.post(
      "http://localhost:5000/api/wishlist",
      { productId },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    fetchWishlist();
  };

  const removeFromWishlist = async (id) => {
    await axios.delete(`http://localhost:5000/api/wishlist/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: wishlist, // ✅ FIX HERE
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
