// src/components/Features.jsx

import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";

const data = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payment",
  },
  {
    icon: <FaUndo />,
    title: "Easy Return",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow-[8px_8px_20px_rgba(0,0,0,0.08),-8px_-8px_20px_white]"
          >
            <div className="text-4xl text-blue-600 mb-4">{item.icon}</div>

            <h2 className="font-semibold text-lg">{item.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
