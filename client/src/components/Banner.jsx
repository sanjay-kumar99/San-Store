// src/components/Banner.jsx
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-linear-to-r from-blue-900 via-blue-800 to-blue-700">
      <div className="max-w-7xl mx-auto px-5">
        <div
          className="rounded-3xl bg-white shadow-[inset_8px_8px_20px_rgba(0,0,0,0.15),inset_-8px_-8px_20px_rgba(255,255,255,0.6)] 
                        flex flex-col md:flex-row items-center justify-between px-10 py-16"
        >
          {/* Left Content */}
          <div className="text-center md:text-left md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Big Summer Sale 🎉
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Get up to{" "}
              <span className="font-semibold text-blue-600">50% OFF</span>
              on top electronics and gadgets. Limited time only!
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-8 px-8 py-4 rounded-full bg-blue-600 text-white font-semibold 
                               hover:bg-blue-700 transition shadow-[4px_4px_12px_rgba(0,0,0,0.2)]"
            >
              Shop Now
            </button>
          </div>

          {/* Right Image */}
          <div className="mt-10 md:mt-0 md:w-1/3 flex justify-center">
            <div className="bg-slate-100 rounded-[40px] p-6 shadow-[15px_15px_40px_rgba(0,0,0,0.2),-15px_-15px_40px_rgba(255,255,255,0.6)]">
              <img
                src="/banner/discount.png"
                alt="Discount Banner"
                className="w-62.5 object-contain hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
