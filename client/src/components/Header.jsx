/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { API_URL } from "../config";

const Header = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const menuRef = useRef(null);

  const wishlistCount = wishlistItems?.length || 0;

  const totalCount = (cartItems || []).reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  // ✅ SEARCH ONLY ON BUTTON CLICK
  const handleSearch = async (e) => {
    if (e) e.preventDefault(); // agar button form ke andar hai to page reload na ho
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/products?search=${query}`);
      const data = await res.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.log("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#071d36] text-white text-sm py-2 px-5 flex justify-between">
        <p>Welcome to SanStore</p>
        <p>24/7 Support | +91 8146774370</p>
      </div>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-50 shadow-lg overflow-visible">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo/logo.png" className="w-10 h-10" />
            <Link to="/">
              <h1 className="text-2xl font-bold">
                <span className="text-blue-600">San</span>Store
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex gap-8 font-medium">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* SEARCH WRAPPER (IMPORTANT FIX) */}
          <div className="hidden md:flex relative bg-[#f1f5f9] rounded-full px-4 py-2 items-center w-80">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);

                if (e.target.value.trim() === "") {
                  setResults([]);
                  setShowResults(false);
                }
              }}
              placeholder="Search products..."
              className="bg-transparent outline-none flex-1"
            />

            <button
              onClick={handleSearch}
              className="ml-2 text-gray-600 hover:text-black"
            >
              <FaSearch />
            </button>

            {/* SEARCH DROPDOWN FIXED POSITION */}
            {showResults && query.trim() !== "" && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto z-50">
                {/* LOADING */}
                {loading && (
                  <div className="p-3 text-gray-500">Searching...</div>
                )}

                {/* NO RESULTS */}
                {!loading && results.length === 0 && (
                  <div className="p-3 text-gray-500">No products found</div>
                )}

                {/* RESULTS */}
                {!loading &&
                  results.length > 0 &&
                  results.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100"
                      onClick={() => {
                        setResults([]);
                        setShowResults(false);
                      }}
                    >
                      <img
                        src={product.images?.[0] || product.image}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          ₹{product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4 text-xl">
            {/* Mobile Search Toggle */}
            <button
              className="md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <FaHeart />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <FaShoppingCart />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 rounded-full">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* User */}
            <div ref={menuRef} className="relative">
              {user ? (
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="hidden sm:block text-sm font-semibold"
                >
                  {user.name}
                </button>
              ) : (
                <Link to="/auth">
                  <FaUser />
                </Link>
              )}

              {/* USER DROPDOWN */}
              {user && showMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl z-50">
                  <div className="p-4 border-b">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <Link
                    className="block px-4 py-2 hover:bg-gray-100"
                    to="/profile"
                  >
                    Profile
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100"
                    to="/orders"
                  >
                    Orders
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100"
                    to="/cart"
                  >
                    Cart
                  </Link>

                  {user.role === "admin" && (
                    <Link className="block px-4 py-2 text-blue-600" to="/admin">
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* HAMBURGER */}
            <button className="lg:hidden" onClick={() => setMobileMenu(true)}>
              <FaBars />
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        {/* MOBILE SEARCH */}
        {showSearch && (
          <div className="md:hidden px-4 pb-3 relative">
            <div className="flex bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.trim() === "") {
                    setResults([]);
                    setShowResults(false);
                  }
                }}
                placeholder="Search products..."
                className="flex-1 bg-transparent outline-none"
              />
              <button onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>

            {/* SEARCH DROPDOWN */}
            {showResults && query.trim() !== "" && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto z-50">
                {loading && (
                  <div className="p-3 text-gray-500">Searching...</div>
                )}
                {!loading && results.length === 0 && (
                  <div className="p-3 text-gray-500">No products found</div>
                )}
                {!loading &&
                  results.length > 0 &&
                  results.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100"
                      onClick={() => {
                        setResults([]);
                        setShowResults(false);
                        setShowSearch(false); // close mobile search after selecting
                      }}
                    >
                      <img
                        src={product.images?.[0] || product.image}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          ₹{product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="w-72 h-full bg-white p-5">
            <div className="flex justify-between mb-6">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setMobileMenu(false)}>
                <FaTimes />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link onClick={() => setMobileMenu(false)} to="/">
                Home
              </Link>
              <Link onClick={() => setMobileMenu(false)} to="/shop">
                Shop
              </Link>
              <Link onClick={() => setMobileMenu(false)} to="/categories">
                Categories
              </Link>
              <Link onClick={() => setMobileMenu(false)} to="/contact">
                Contact
              </Link>
              <Link onClick={() => setMobileMenu(false)} to="/auth">
                Login
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
