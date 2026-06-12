/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function ManageProducts() {
  const { user } = useContext(AuthContext);
  const userRole = user?.role;

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    countInStock: "",
    imageFile: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data.products || data);
    } catch (error) {
      Swal.fire("Error", "Failed to load products", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      setForm((prev) => ({ ...prev, imageFile: file }));
      setPreview(file ? URL.createObjectURL(file) : preview);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleShow = () => {
    setIsEdit(false);
    setForm({
      name: "",
      price: "",
      description: "",
      category: "",
      brand: "",
      countInStock: "",
      imageFile: null,
    });
    setPreview("");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setForm({
      name: "",
      price: "",
      description: "",
      category: "",
      brand: "",
      countInStock: "",
      imageFile: null,
    });
    setPreview("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.description.trim()) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("brand", form.brand);
      formData.append("countInStock", form.countInStock);
      if (form.imageFile) formData.append("image", form.imageFile);

      if (isEdit && editId) {
        await axios.put(`/products/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Success", "Product updated successfully", "success");
      } else {
        await axios.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Success", "Product added successfully", "success");
      }

      handleClose();
      fetchProducts();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Operation failed",
        "error",
      );
    }
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      brand: product.brand,
      countInStock: product.countInStock,
      imageFile: null,
    });
    setPreview(product.image ? `http://localhost:5000${product.image}` : "");
    setShow(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/products/${id}`);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  return (
    <div className="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-amber-300">
          Manage Products
        </h2>
      </div>

      {userRole === "admin" && (
        <div className="mb-8 text-center">
          <button
            className="rounded-3xl bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
            onClick={handleShow}
          >
            Add Product
          </button>
        </div>
      )}

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div className="w-full max-w-3xl rounded-4xl border border-slate-800 bg-slate-950 p-8 shadow-2xl shadow-slate-950/40 max-h-[calc(100vh-4rem)] overflow-hidden">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-amber-300">
                {isEdit ? "Edit Product" : "Add Product"}
              </h3>
              <button
                className="rounded-full bg-slate-800 p-3 text-slate-200 transition hover:bg-slate-700"
                onClick={handleClose}
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 overflow-y-auto pr-2"
              style={{ maxHeight: "calc(100vh - 9rem)" }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              />
              <textarea
                name="description"
                rows="3"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              />
              <input
                type="number"
                name="countInStock"
                placeholder="Count In Stock"
                value={form.countInStock}
                onChange={handleChange}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              />
              <label className="block text-sm font-medium text-slate-300">
                Product Image
              </label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 file:rounded-full file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:text-slate-950 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 rounded-3xl object-cover"
                />
              )}
              <div className="mt-4 flex flex-wrap gap-3 justify-end">
                <button
                  type="button"
                  className="rounded-3xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-3xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                >
                  {isEdit ? "Update" : "Add"} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-slate-400">
            No products found
          </p>
        ) : (
          products.map((product, index) => (
            <motion.div
              key={product._id}
              className="rounded-4xl border border-slate-800 bg-slate-950 p-4 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={`https://ecommerce-api-nu2d.onrender.com${product.image}`}
                alt={product.name}
                className="mb-4 h-52 w-full rounded-3xl object-cover"
              />
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-amber-300">
                    {product.name}
                  </h3>
                  <p className="text-slate-400">₹{product.price}</p>
                </div>
                <p
                  className="text-slate-400 line-clamp-2"
                  title={product.description}
                >
                  {product.description}
                </p>
                {userRole === "admin" && (
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button
                      className="rounded-3xl bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit className="inline mr-2" /> Edit
                    </button>
                    <button
                      className="rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash className="inline mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
