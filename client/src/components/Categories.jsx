// src/components/Categories.jsx

import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaCamera,
  FaGamepad,
  FaClock,
  FaTv,
} from "react-icons/fa";
import { GiClothes, GiSonicShoes } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Mobiles", icon: <FaMobileAlt /> },
  { title: "Laptop", icon: <FaLaptop /> },
  { title: "Headphones", icon: <FaHeadphones /> },
  { title: "Camera", icon: <FaCamera /> },
  { title: "Gaming", icon: <FaGamepad /> },
  { title: "Smart Watch", icon: <FaClock /> },
  { title: "Television", icon: <FaTv /> },
  { title: "Clothes", icon: <GiClothes /> },
  { title: "Shoes", icon: <GiSonicShoes /> },
];

const Categories = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12">
          Shop By Category
        </h2>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/category/${item.title}`)}
              className="bg-white rounded-3xl p-8 text-center cursor-pointer transition duration-300 hover:-translate-y-2 shadow-[8px_8px_20px_rgba(0,0,0,0.08),-8px_-8px_20px_white]"
            >
              <div className="text-5xl text-blue-600 mb-5">{item.icon}</div>

              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
