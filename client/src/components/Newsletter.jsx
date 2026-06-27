// src/components/Newsletter.jsx

const Newsletter = () => {
  return (
    <section className="py-20 bg-[#071d36]">
      <div className="max-w-5xl mx-auto px-5 text-center text-white">
        <h1 className="text-5xl font-bold">Subscribe Newsletter</h1>

        <p className="mt-5 text-gray-300">Get latest offers and updates.</p>

        <div className="flex flex-col md:flex-row gap-5 mt-10">
          <input
            type="email"
            placeholder="Enter email address"
            className="flex-1 px-6 py-4 rounded-full text-black outline-none"
          />

          <button className="bg-blue-600 px-8 py-4 rounded-full hover:bg-blue-700 duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
