// src/pages/Contact.jsx
const Contact = () => {
  return (
    <section className="min-h-screen bg-[#f5f7fa] py-20">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-3xl p-8 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.6)]">
            <p className="text-slate-700 mb-4">📍 Ludhiana, Punjab, India</p>
            <p className="text-slate-700 mb-4">📞 +91 8146774370</p>
            <p className="text-slate-700">✉️ support@sancart.com</p>
          </div>

          {/* Contact Form */}
          <form className="bg-white rounded-3xl p-8 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.6)] space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none"
            ></textarea>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
