// src/components/Hero.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";


const slides = [
  {
    id: 1,
    subtitle: "NEW ARRIVAL",
    title: "Premium Sound Speaker",
    description:
      "Experience crystal clear sound with the latest Bluetooth speaker collection.",
    image: "/hero/speaker.png",
  },
  {
    id: 2,
    subtitle: "LATEST SMART WATCH",
    title: "Smart Watch Series",
    description: "Stay connected with health tracking and premium design.",
    image: "/hero/watch.png",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-[#071d36] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid lg:grid-cols-2 gap-10 items-center min-h-150">
                {/* Left */}
                <div className="text-white">
                  <p className="uppercase text-blue-300 tracking-widest mb-4">
                    {slide.subtitle}
                  </p>

                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-gray-300 mt-6 text-lg">
                    {slide.description}
                  </p>

                  <button
                    onClick={() => navigate("/shop")}
                    className="mt-10 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 duration-300 shadow-xl"
                  >
                    Shop Now
                  </button>
                </div>

                {/* Right */}
                <div className="relative flex justify-center">
                  <div className="absolute w-100 h-100 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>

                  <div className="bg-white rounded-[50px] p-8 shadow-[15px_15px_40px_rgba(0,0,0,0.2),-10px_-10px_30px_rgba(255,255,255,0.1)]">
                    <img
                      src={slide.image}
                      alt=""
                      className="w-87.5 object-contain hover:scale-105 duration-300"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
