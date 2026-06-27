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
    const { data } = await axios.get("http://localhost:5000/api/products", {
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

    await axios.delete(`http://localhost:5000/api/products/${id}`, {
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
      <div className="bg-white p-8 rounded-3xl shadow">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>

          {selectedIds.length > 0 && (
            <button
              onClick={bulkDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>

        {/* TABLE */}
        <table className="w-full">
          <thead>
            <tr className="border-b h-14">
              <th>Select</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center border-b h-20">
                {/* CHECKBOX */}
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p._id)}
                    onChange={() => toggleSelect(p._id)}
                  />
                </td>

                {/* IMAGE */}
                <td>
                  <img src={p.images?.[0]} className="h-14 mx-auto rounded" />
                </td>

                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>

                <td>
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
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
