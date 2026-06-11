/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

function Home() {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/products");
        const allProducts = res.data.products || res.data;
        setProducts(allProducts);
        setFeatured(allProducts.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 🌟 HERO SECTION (PREMIUM) */}
        <motion.section
          className="relative overflow-hidden rounded-4xl bg-linear-to-r from-sky-600 via-indigo-600 to-violet-700 p-10 shadow-2xl shadow-slate-950/30"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="relative text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Welcome to <span className="text-amber-300">SanC@rt</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-100/90 sm:text-lg">
              Premium shopping experience with unbeatable deals & fast delivery
              🚀
            </p>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
              onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
            >
              Explore Products
            </motion.button>
          </div>
        </motion.section>

        {/* ⭐ FEATURED SECTION */}
        {featured.length > 0 && (
          <section className="mt-16">
            <h2 className="text-center text-3xl font-semibold text-white">
              ⭐ Featured Products
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <motion.div
                  key={p._id}
                  className="rounded-3xl bg-slate-900/90 p-4 shadow-xl shadow-slate-950/30"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard product={p} isFeatured />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* 🛍 ALL PRODUCTS SECTION */}
        <section className="mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white">
              🛍 All Products
            </h2>
            <p className="mt-3 text-slate-400">
              Browse our complete collection of amazing products
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.length === 0 ? (
              <p className="text-center text-slate-400">
                No products available.
              </p>
            ) : (
              products.map((p, index) => (
                <motion.div
                  key={p._id}
                  className="rounded-3xl bg-slate-900/90 p-2 shadow-lg shadow-slate-950/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
