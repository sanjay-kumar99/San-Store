import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaPlus,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative
    ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="h-screen flex bg-slate-100 overflow-hidden">
      {/* BACKDROP (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static z-50
          w-72 h-screen
          bg-slate-950 text-white
          flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wide">🛒 Admin Panel</h1>
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* NAV (scrollable area) */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <NavLink
            to="/admin"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FaChartLine /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FaBox /> Products
          </NavLink>
          <NavLink
            to="/admin/add-product"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FaPlus /> Add Product
          </NavLink>
          <NavLink
            to="/admin/users"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FaUsers /> Users
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FaShoppingCart /> Orders
          </NavLink>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>

        {/* LOGOUT (always pinned at bottom) */}
        {/* <div className="p-5 border-t border-slate-800"></div> */}
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col h-screen">
        {/* TOP BAR */}
        <header className="h-14 bg-white shadow flex items-center px-4 lg:px-6">
          <button className="lg:hidden mr-3" onClick={() => setOpen(true)}>
            <FaBars size={20} />
          </button>
          <h2 className="font-semibold text-slate-700">Admin Dashboard</h2>
        </header>

        {/* CONTENT (independent scroll) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
