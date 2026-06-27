/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const Header = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  const wishlistCount = wishlistItems?.length || 0;

  const totalCount = (cartItems || []).reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    window.location.href = "/";
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#071d36] text-white text-sm py-2 px-5 flex justify-between">
        <p>Welcome to SanStore</p>
        <p>24/7 Support | +91 8146774370</p>
      </div>

      {/* Navbar */}
      <header className="bg-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <img
              src="/logo/logo.png"
              alt="SanStore Logo"
              className="w-10 h-10 object-contain"
            />
            <Link to="/">
              <h1 className="text-3xl font-bold">
                <span className="text-blue-600">San</span>
                <span className="text-black">Store</span>
              </h1>
            </Link>
          </div>

          {/* Menu */}
          <nav className="hidden lg:flex gap-8 font-medium">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link to="/shop" className="hover:text-blue-600">
              Shop
            </Link>

            <Link to="/categories" className="hover:text-blue-600">
              Categories
            </Link>

            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex bg-[#f1f5f9] rounded-full px-4 py-2 items-center w-80 shadow-inner">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none flex-1"
            />
            <FaSearch className="text-gray-500" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 text-xl">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <FaHeart className="cursor-pointer hover:text-red-500 transition" />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <FaShoppingCart className="cursor-pointer hover:text-blue-600 transition" />

              {totalCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="relative" ref={menuRef}>
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
                onClick={() => {
                  if (user) {
                    setShowMenu(!showMenu);
                  }
                }}
              >
                {user ? (
                  <span className="text-sm font-semibold">{user.name}</span>
                ) : (
                  <Link to="/auth" className="relative">
                    <FaUser />
                  </Link>
                )}
              </div>

              {/* Dropdown */}
              {user && showMenu && (
                <div
                  className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
                  onMouseLeave={() => setShowMenu(false)}
                >
                  {/* User Info */}
                  <div className="px-5 py-4 bg-slate-50 border-b">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  {/* Links */}
                  <Link
                    to="/profile"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    📦 My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    ❤️ Wishlist
                  </Link>

                  <Link
                    to="/cart"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    🛒 Cart
                  </Link>

                  {/* Admin */}
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-5 py-3 text-blue-600 hover:bg-gray-100"
                    >
                      ⚙️ Admin Dashboard
                    </Link>
                  )}

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
