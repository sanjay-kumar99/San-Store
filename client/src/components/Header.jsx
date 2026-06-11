/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";
import pic from "../assets/user.webp";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
        Swal.fire("Success", "Logged out successfully!", "success");
      }
    });
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link
          className="flex items-center gap-3 text-white hover:text-slate-100"
          to="/"
        >
          <img
            src={logo}
            alt="logo"
            width="40"
            height="40"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="text-lg font-semibold">Shoply</span>
        </Link>

        <button
          className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white transition hover:bg-white/10 md:hidden"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span>{mobileOpen ? "Close" : "Menu"}</span>
        </button>

        <div
          className={`${mobileOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-slate-950/90 p-4 md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0">
            <ul className="flex flex-col gap-3 text-sm md:flex-row md:items-center">
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 text-white transition hover:bg-white/10"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 text-white transition hover:bg-white/10"
                  to="/manageproducts"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 text-white transition hover:bg-white/10"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <Link
                to="/cart"
                className="relative inline-flex items-center rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white transition hover:bg-white/10"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <img
                      src={pic}
                      alt="user"
                      width="35"
                      height="35"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <span className="hidden md:inline">Hi, {user.name}</span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-44 rounded-xl bg-white p-3 text-slate-900 shadow-lg"
                        style={{ zIndex: 999 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <button
                          className="w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col gap-2 md:flex-row">
                  <Link
                    className="rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
