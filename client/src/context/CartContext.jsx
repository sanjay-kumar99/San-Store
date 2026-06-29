/* eslint-disable react-hooks/set-state-in-effect */
// src/context/CartContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useAuth } from "../hooks/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();

  // Cart load
  const fetchCart = async () => {
    try {
      if (!token) {
        setCartItems([]);
        return;
      }

      const { data } = await axios.get(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  // Add cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/cart`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.delete(`${API_URL}/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Update quantity
  const updateQty = async (id, quantity) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `${API_URL}/api/cart/${id}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        updateQty,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
