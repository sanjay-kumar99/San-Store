/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useAuth } from "../hooks/useAuth";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useAuth();

  const fetchWishlist = async () => {
    try {
      if (!token) {
        setWishlist([]);
        return;
      }

      const { data } = await axios.get(`${API_URL}/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(data);
    } catch (error) {
      console.log("Wishlist Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);
  const addToWishlist = async (productId) => {
    await axios.post(
      `${API_URL}/api/wishlist`,
      { productId },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    fetchWishlist();
  };

  const removeFromWishlist = async (id) => {
    await axios.delete(`${API_URL}/api/wishlist/${id}`, {
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
