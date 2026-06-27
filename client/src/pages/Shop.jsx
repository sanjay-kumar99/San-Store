// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <section className="min-h-screen bg-[#f5f7fa] py-20">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
          Our Products
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
