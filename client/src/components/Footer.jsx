/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="bg-slate-950 text-slate-100 pt-10 mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* ABOUT */}
          <div>
            <h4 className="text-2xl font-semibold text-white">SanC@rt</h4>
            <p className="mt-4 text-slate-400 leading-7">
              Your one-stop e-commerce platform for quality products at the best
              prices. We deliver trust, speed, and satisfaction.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h5 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h5>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/manageproducts"
                  className="hover:text-white transition"
                >
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h5 className="text-xl font-semibold text-white mb-4">Contact</h5>
            <p className="text-slate-400 mb-2">📍 Ludhiana, Punjab, India</p>
            <p className="text-slate-400 mb-2">📞 +91 98765 43210</p>
            <p className="text-slate-400">✉️ support@sancart.com</p>

            {/* SOCIAL */}
            <div className="mt-5 flex gap-4 text-2xl text-slate-200">
              <a href="#" className="hover:text-white transition">
                🌐
              </a>
              <a href="#" className="hover:text-white transition">
                🐦
              </a>
              <a href="#" className="hover:text-white transition">
                📸
              </a>
              <a href="#" className="hover:text-white transition">
                💼
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-slate-100 font-semibold">SanC@rt</span> | All
            Rights Reserved
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
