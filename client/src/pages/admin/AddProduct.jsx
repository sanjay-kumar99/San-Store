import { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../config";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    brand: "",
    countInStock: "",
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();
  const videoRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE PREVIEW
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // VIDEO PREVIEW
  const handleVideos = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => formData.append("images", img));
      videos.forEach((vid) => formData.append("videos", vid));

      await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // ✅ SWEET ALERT SUCCESS
      Swal.fire({
        title: "Success 🎉",
        text: "Product added successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // RESET FORM
      setForm({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        category: "",
        brand: "",
        countInStock: "",
      });

      setImages([]);
      setVideos([]);

      if (imageRef.current) imageRef.current.value = "";
      if (videoRef.current) videoRef.current.value = "";
    } catch (error) {
      console.log(error.response?.data || error.message);

      Swal.fire({
        title: "Error ❌",
        text: "Failed to add product",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* INPUTS */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input"
          />
          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="input resize-none"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="input"
          />
          <input
            name="oldPrice"
            value={form.oldPrice}
            onChange={handleChange}
            placeholder="Old Price"
            className="input"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="input"
          />
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="input"
          />
          <input
            name="countInStock"
            value={form.countInStock}
            onChange={handleChange}
            placeholder="Stock"
            className="input"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="font-semibold">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImage}
            ref={imageRef}
            className="mt-3 block w-full rounded-xl border border-slate-300 p-3"
          />

          {/* IMAGE PREVIEW */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-full aspect-square object-cover rounded-xl border"
              />
            ))}
          </div>
        </div>

        {/* VIDEO UPLOAD */}
        <div>
          <label className="font-semibold">Videos</label>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={handleVideos}
            ref={videoRef}
            className="mt-3 block w-full rounded-xl border border-slate-300 p-3"
          />

          {/* VIDEO PREVIEW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {videos.map((vid, i) => (
              <video
                key={i}
                src={URL.createObjectURL(vid)}
                className="w-full rounded-xl border"
                controls
              />
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
            loading
              ? "bg-gray-400"
              : "bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-xl hover:-translate-y-0.5"
          }`}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
