// src/components/Brands.jsx

const brands = [
  "/brands/apple.png",
  "/brands/samsung.png",
  "/brands/jbl.png",
  "/brands/sony.png",
  "/brands/hp.png",
  "/brands/asus.png",
];

const Brands = () => {
  return (
    <section className="bg-[#f5f7fa] py-20">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12">Top Brands</h2>

        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl flex justify-center items-center shadow-[8px_8px_20px_rgba(0,0,0,0.08),-8px_-8px_20px_white]"
            >
              <img src={brand} alt="" className="h-16 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
