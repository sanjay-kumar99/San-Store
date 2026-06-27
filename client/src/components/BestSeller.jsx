/* eslint-disable react-hooks/purity */
// src/components/BestSeller.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { API_URL } from "../config";

const BestSeller = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12">
          Best Seller Products
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...(products || [])]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
