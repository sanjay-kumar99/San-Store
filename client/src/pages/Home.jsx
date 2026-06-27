// src/pages/Home.jsx

import Hero from "../components/Hero";
import Features from "../components/Features";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import Banner from "../components/Banner";
import Brands from "../components/Brands";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <BestSeller />
      <Banner />
      <Brands />
      <Newsletter />
    </>
  );
};

export default Home;
