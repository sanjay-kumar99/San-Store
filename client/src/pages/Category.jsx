// src/pages/Category.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../config";

const Category = () => {
  const { category } = useParams(); // URL से category लेगा
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/products/category/${category}`,
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12">
          {category} Products
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Category;
