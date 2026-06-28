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

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-2 px-3 rounded ${
      isActive
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="h-screen flex bg-slate-100 overflow-hidden">

      {/* Sidebar (IMPORTANT: sticky instead of fixed) */}
      <aside
        className={`
          w-64 bg-slate-900 text-white p-6
          h-screen
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          fixed lg:static
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>

          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-2">
          <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>
            <FaChartLine />
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" className={linkClass} onClick={() => setOpen(false)}>
            <FaBox />
            Products
          </NavLink>

          <NavLink to="/admin/add-product" className={linkClass} onClick={() => setOpen(false)}>
            <FaPlus />
            Add Product
          </NavLink>

          <NavLink to="/admin/users" className={linkClass} onClick={() => setOpen(false)}>
            <FaUsers />
            Users
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass} onClick={() => setOpen(false)}>
            <FaShoppingCart />
            Orders
          </NavLink>
        </nav>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="flex items-center gap-3 text-red-400 mt-6"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main (ONLY THIS SCROLLS) */}
      <div className="flex-1 flex flex-col h-screen">

        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow p-4 flex items-center">
          <button onClick={() => setOpen(true)}>
            <FaBars size={22} />
          </button>
          <h2 className="ml-4 font-bold text-lg">Admin Panel</h2>
        </div>

        {/* SCROLL AREA FIX */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;