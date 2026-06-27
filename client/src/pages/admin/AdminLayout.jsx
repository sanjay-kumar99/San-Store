import { Link, Outlet } from "react-router-dom";
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaPlus,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <div className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-10">Admin Panel</h1>

        <div className="space-y-5">

          <Link to="/admin" className="flex gap-3 items-center">
            <FaChartLine /> Dashboard
          </Link>

          <Link to="/admin/products" className="flex gap-3 items-center">
            <FaBox /> Products
          </Link>

          <Link to="/admin/add-product" className="flex gap-3 items-center">
            <FaPlus /> Add Product
          </Link>

          <Link to="/admin/users" className="flex gap-3 items-center">
            <FaUsers /> Users
          </Link>

          <Link to="/admin/orders" className="flex gap-3 items-center">
            <FaShoppingCart /> Orders
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="flex gap-3 items-center text-red-400"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;