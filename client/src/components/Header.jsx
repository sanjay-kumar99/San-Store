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
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../config";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();

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

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
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
      {/* TOP BAR */}
      <div className="bg-[#071d36] text-white text-sm py-2 px-5 flex justify-between">
        <p>Welcome to SanStore</p>
        <p>24/7 Support | +91 8146774370</p>
      </div>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src="/logo/logo.png" className="w-10 h-10" />
            <Link to="/">
              <h1 className="text-2xl font-bold">
                <span className="text-blue-600">San</span>Store
              </h1>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-8 font-medium">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* SEARCH DESKTOP */}
          <div className="hidden md:flex relative bg-[#f1f5f9] rounded-full px-4 py-2 items-center w-80">
            <input
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

            <button onClick={handleSearch}>
              <FaSearch className="text-gray-600 hover:text-black" />
            </button>

            {/* RESULTS */}
            {showResults && query.trim() !== "" && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto z-50">
                {loading && (
                  <div className="p-3 text-gray-500">Searching...</div>
                )}

                {!loading && results.length === 0 && (
                  <div className="p-3 text-gray-500">No products found</div>
                )}

                {!loading &&
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
                        src={product.images?.[0]}
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
          <div className="flex items-center gap-5 text-xl">
            {/* MOBILE SEARCH */}
            <button
              className="md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </button>

            {/* WISHLIST */}
            <Link to="/wishlist" className="relative">
              <FaHeart />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART */}
            <Link to="/cart" className="relative">
              <FaShoppingCart />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 rounded-full">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* USER */}
            <div ref={menuRef} className="relative">
              {user ? (
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <FaUser />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </button>
              ) : (
                <Link to="/auth">
                  <FaUser />
                </Link>
              )}

              {/* DROPDOWN */}
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

                  {user.role === "admin" && (
                    <Link className="block px-4 py-2 text-blue-600" to="/admin">
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE MENU */}
            <button className="lg:hidden" onClick={() => setMobileMenu(true)}>
              <FaBars />
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        {showSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex bg-gray-100 rounded-full px-4 py-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                placeholder="Search products..."
              />
              <button onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
