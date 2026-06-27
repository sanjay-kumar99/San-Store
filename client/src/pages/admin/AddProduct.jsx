import { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

      await axios.post("http://localhost:5000/api/products", formData, {
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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* INPUTS */}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />

        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="input" />
        <input name="oldPrice" value={form.oldPrice} onChange={handleChange} placeholder="Old Price" className="input" />

        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="input" />
        <input name="countInStock" value={form.countInStock} onChange={handleChange} placeholder="Stock" className="input" />

        {/* IMAGE UPLOAD */}
        <div>
          <label className="font-semibold">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImage}
            ref={imageRef}
          />

          {/* IMAGE PREVIEW */}
          <div className="flex gap-3 mt-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-20 h-20 object-cover rounded"
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
          />

          {/* VIDEO PREVIEW */}
          <div className="flex gap-3 mt-2 flex-wrap">
            {videos.map((vid, i) => (
              <video
                key={i}
                src={URL.createObjectURL(vid)}
                className="w-24 h-24 rounded"
                controls
              />
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white ${
            loading
              ? "bg-gray-400"
              : "bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90"
          }`}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;