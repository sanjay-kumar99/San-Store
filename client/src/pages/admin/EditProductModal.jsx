// src/pages/admin/EditProductModal.jsx

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config";

const EditProductModal = ({ product, onClose, fetchProducts }) => {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand,
    countInStock: product.countInStock,
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Update Product?",
      text: "Changes will be saved permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      backdrop: true,
    });
    if (!result.isConfirmed) return;
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("brand", form.brand);
      formData.append("countInStock", form.countInStock);

      images.forEach((img) => {
        formData.append("images", img);
      });

      videos.forEach((vid) => {
        formData.append("videos", vid);
      });
      await axios.put(`${API_URL}/api/products/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await Swal.fire({
        title: "Updated",
        text: "Product  updated  successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      fetchProducts();
      onClose();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Swal.fire({
        title: "Error!",
        text: "Failed to update product.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Edit Product</h2>

          <button onClick={onClose} className="text-red-600 font-bold text-xl">
            X
          </button>
        </div>

        <form onSubmit={updateProduct} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Product Name"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Description"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Price"
          />

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Category"
          />

          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Brand"
          />

          <input
            type="number"
            name="countInStock"
            value={form.countInStock}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            placeholder="Stock"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
          />

          <input
            type="file"
            multiple
            accept="video/*"
            onChange={(e) => setVideos([...e.target.files])}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
