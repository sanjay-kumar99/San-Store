/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-api-nu2d.onrender.com/api/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-api-nu2d.onrender.com/api/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-api-nu2d.onrender.com/api/auth/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: `Are you sure you want to delete "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://ecommerce-api-nu2d.onrender.com/api/products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        Swal.fire("Deleted!", `${name} has been deleted.`, "success");
        fetchProducts();
      } catch (err) {
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct({ ...product });
    setShowModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      await axios.put(
        `https://ecommerce-api-nu2d.onrender.com/api/products/${editProduct._id}`,
        editProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      Swal.fire("Updated!", "Product updated successfully.", "success");
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      Swal.fire("Error!", "Failed to update product.", "error");
    }
  };

  const handleUpdateOrder = async (id) => {
    const { value: status } = await Swal.fire({
      title: "Update Order Status",
      input: "select",
      inputOptions: {
        Pending: "Pending",
        Shipped: "Shipped",
        Delivered: "Delivered",
      },
      inputPlaceholder: "Select status",
      showCancelButton: true,
    });

    if (status) {
      try {
        await axios.put(
          `https://ecommerce-api-nu2d.onrender.com/api/orders/${id}`,
          { status },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        Swal.fire("Updated!", "Order status updated.", "success");
        fetchOrders();
      } catch (err) {
        Swal.fire("Error!", "Failed to update order.", "error");
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-slate-100">
      <aside className="w-full lg:w-72 border-b border-slate-800 bg-slate-900/95 p-6 lg:border-r lg:border-b-0">
        <div className="mb-8 text-center">
          <h4 className="text-xl font-semibold text-amber-300">Admin Panel</h4>
        </div>
        <div className="space-y-3">
          <button
            className={`w-full rounded-3xl px-4 py-3 text-left transition ${
              activePage === "dashboard"
                ? "bg-amber-300 text-slate-950"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            onClick={() => setActivePage("dashboard")}
          >
            <FaTachometerAlt className="mr-2 inline" /> Dashboard
          </button>
          <button
            className={`w-full rounded-3xl px-4 py-3 text-left transition ${
              activePage === "products"
                ? "bg-amber-300 text-slate-950"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            onClick={() => navigate("/manageproducts")}
          >
            <FaBox className="mr-2 inline" /> Products
          </button>
          <button
            className={`w-full rounded-3xl px-4 py-3 text-left transition ${
              activePage === "orders"
                ? "bg-amber-300 text-slate-950"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            onClick={() => navigate("/manageorders")}
          >
            <FaShoppingCart className="mr-2 inline" /> Orders
          </button>
          <button
            className={`w-full rounded-3xl px-4 py-3 text-left transition ${
              activePage === "users"
                ? "bg-amber-300 text-slate-950"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            onClick={() => setActivePage("users")}
          >
            <FaUsers className="mr-2 inline" /> Users
          </button>
        </div>
        <div className="mt-8">
          <button
            className="w-full rounded-3xl bg-rose-500 px-4 py-3 text-slate-950 transition hover:bg-rose-400"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2 inline" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8">
        <header className="mb-6 rounded-4xl border border-slate-800 bg-slate-900/95 px-6 py-5 shadow-xl shadow-slate-950/20">
          <p className="text-xl font-semibold text-slate-100">
            Welcome, Admin 👋
          </p>
        </header>

        {activePage === "dashboard" && (
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-amber-300">Dashboard</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-4xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Total Products
                </p>
                <p className="mt-4 text-4xl font-bold text-slate-100">
                  {products.length}
                </p>
              </div>
              <div className="rounded-4xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Total Orders
                </p>
                <p className="mt-4 text-4xl font-bold text-slate-100">
                  {orders.length}
                </p>
              </div>
              <div className="rounded-4xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Total Users
                </p>
                <p className="mt-4 text-4xl font-bold text-slate-100">
                  {users.length}
                </p>
              </div>
            </div>
          </section>
        )}

        {activePage === "products" && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-3xl font-semibold text-amber-300">
                Products
              </h2>
            </div>
            <div className="overflow-hidden rounded-4xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/20">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">#</th>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Brand</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.map((p, index) => (
                    <tr
                      key={p._id}
                      className="bg-slate-950/70 transition hover:bg-slate-900"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{p.name}</td>
                      <td className="px-6 py-4">₹{p.price}</td>
                      <td className="px-6 py-4">{p.brand}</td>
                      <td className="px-6 py-4">{p.category}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          className="rounded-2xl bg-amber-300 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                          onClick={() => handleEditProduct(p)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="rounded-2xl bg-rose-500 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-rose-400"
                          onClick={() => handleDeleteProduct(p._id, p.name)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activePage === "orders" && (
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-amber-300">Orders</h2>
            <div className="overflow-hidden rounded-4xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/20">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">#</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((o, index) => (
                    <tr
                      key={o._id}
                      className="bg-slate-950/70 hover:bg-slate-900 transition"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{o.user?.name || "N/A"}</td>
                      <td className="px-6 py-4">{o.status}</td>
                      <td className="px-6 py-4">
                        <button
                          className="rounded-2xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400"
                          onClick={() => handleUpdateOrder(o._id)}
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activePage === "users" && (
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-amber-300">Users</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {users.length === 0 ? (
                <p className="text-slate-400">No users found.</p>
              ) : (
                users.map((u) => (
                  <div
                    key={u._id}
                    className="rounded-[1.75rem] border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1"
                  >
                    <h5 className="mb-2 text-xl font-semibold text-slate-100">
                      {u.name}
                    </h5>
                    <p className="text-slate-400">{u.email}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="w-full max-w-2xl rounded-4xl border border-slate-800 bg-slate-950 p-8 shadow-2xl shadow-slate-950/40">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-amber-300">
                Edit Product
              </h3>
              <button
                className="rounded-full bg-slate-800 p-3 text-slate-200 transition hover:bg-slate-700"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="grid gap-4">
              <input
                type="text"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                placeholder="Name"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
              <input
                type="number"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                placeholder="Price"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                placeholder="Brand"
                value={editProduct.brand}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, brand: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                placeholder="Category"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                placeholder="Image URL"
                value={editProduct.image}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, image: e.target.value })
                }
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <button
                className="rounded-3xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-3xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                onClick={handleSaveProduct}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminDashboard;
