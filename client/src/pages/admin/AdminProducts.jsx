/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditProductModal from "./EditProductModal";
import { API_URL } from "../../config";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // SINGLE DELETE (SweetAlert)
  // =========================
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    await axios.delete(`${API_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    Swal.fire("Deleted!", "Product has been deleted.", "success");

    fetchProducts();
  };

  // =========================
  // SELECT MULTIPLE
  // =========================
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // =========================
  // BULK DELETE
  // =========================
  const bulkDelete = async () => {
    if (selectedIds.length === 0) return;

    const result = await Swal.fire({
      title: `Delete ${selectedIds.length} products?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all!",
    });

    if (!result.isConfirmed) return;

    await Promise.all(
      selectedIds.map((id) =>
        axios.delete(`${API_URL}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ),
    );

    Swal.fire("Deleted!", "Selected products deleted.", "success");

    setSelectedIds([]);
    fetchProducts();
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>

          {selectedIds.length > 0 && (
            <button
              onClick={bulkDelete}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl transition"
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Select</th>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(p._id)}
                      onChange={() => toggleSelect(p._id)}
                    />
                  </td>
                  <td className="p-3">
                    <img
                      src={p.images?.[0]}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-lg mx-auto"
                    />
                  </td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {products.map((p) => (
            <div key={p._id} className="border rounded-2xl p-4 shadow-sm">
              <div className="flex gap-4">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{p.name}</h2>
                  <p className="text-blue-600 font-bold mt-1">₹{p.price}</p>
                  <p className="text-sm text-slate-500">{p.category}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p._id)}
                  onChange={() => toggleSelect(p._id)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="bg-blue-600 text-white py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-600 text-white py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          fetchProducts={fetchProducts}
        />
      )}
    </>
  );
};

export default AdminProducts;
