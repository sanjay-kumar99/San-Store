import { FaShippingFast, FaHeadset, FaShieldAlt, FaUndo } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 via-blue-700 to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About SanStore
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-200">
            Your trusted destination for premium electronics, gadgets, fashion
            and lifestyle products. We deliver quality, reliability and
            exceptional customer experiences.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              alt=""
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>

            <p className="text-gray-600 leading-8">
              SanStore was founded with one mission: make premium products
              accessible to everyone. We carefully select quality products and
              provide fast delivery, secure payments, and exceptional support.
            </p>

            <p className="text-gray-600 leading-8 mt-4">
              Today, thousands of customers trust us for electronics, fashion,
              accessories and lifestyle products across India.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 text-center shadow">
              <FaShippingFast className="text-5xl text-blue-600 mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">Fast Delivery</h3>
              <p className="text-gray-500">Quick shipping across India.</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 text-center shadow">
              <FaShieldAlt className="text-5xl text-green-600 mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">Secure Payments</h3>
              <p className="text-gray-500">100% secure payment gateways.</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 text-center shadow">
              <FaUndo className="text-5xl text-orange-500 mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">Easy Returns</h3>
              <p className="text-gray-500">Hassle-free return process.</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 text-center shadow">
              <FaHeadset className="text-5xl text-purple-600 mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">24/7 Support</h3>
              <p className="text-gray-500">Dedicated customer assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-4 gap-10 text-center">
            <div>
              <h2 className="text-5xl font-bold">50K+</h2>
              <p className="mt-3">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">10K+</h2>
              <p className="mt-3">Products Sold</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">100+</h2>
              <p className="mt-3">Brands</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">4.9★</h2>
              <p className="mt-3">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-14">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-3xl shadow p-6 text-center">
              <img
                src="/banner/My.jpeg"
                alt=""
                className="w-32 h-32 rounded-full mx-auto mb-4 "
              />
              <h3 className="font-bold text-xl">Sanjay Kumar</h3>
              <p className="text-gray-500">Founder & CEO</p>
            </div>

            <div className="bg-white rounded-3xl shadow p-6 text-center">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt=""
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-xl">Priya Sharma</h3>
              <p className="text-gray-500">Marketing Head</p>
            </div>

            <div className="bg-white rounded-3xl shadow p-6 text-center">
              <img
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt=""
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-xl">Rahul Verma</h3>
              <p className="text-gray-500">Operations Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-5">
          <h2 className="text-4xl font-bold mb-5">
            Join Thousands Of Happy Customers
          </h2>

          <p className="text-gray-300 mb-8">
            Explore premium products and experience shopping like never before.
          </p>
          <Link to="/shop">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
