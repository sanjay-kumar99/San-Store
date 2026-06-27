// src/components/Footer.jsx

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#02111f] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold text-blue-500 mb-5">
              ShopSphere
            </h2>

            <p className="text-gray-400 leading-7">
              Premium Ecommerce Website for electronics, gadgets and modern
              accessories. Experience shopping with quality and trust.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-xl mb-5">Company</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link className="hover:text-white duration-300" to="/about">
                  About Us
                </Link>
              </li>

              <li>
                <Link className="hover:text-white duration-300" to="/shop">
                  Shop
                </Link>
              </li>

              <li>
                <Link className="hover:text-white duration-300" to="/contact">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link className="hover:text-white duration-300" to="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-xl mb-5">Support</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link className="hover:text-white duration-300" to="/faq">
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-white duration-300"
                  to="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link className="hover:text-white duration-300" to="/terms">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-white duration-300"
                  to="/shipping-policy"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-xl mb-5">Follow Us</h3>

            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg"
              >
                <FaFacebookF />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-pink-600 hover:text-white transition duration-300 shadow-lg"
              >
                <FaInstagram />
              </a>

              {/* Twitter */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-sky-500 hover:text-white transition duration-300 shadow-lg"
              >
                <FaTwitter />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-blue-700 hover:text-white transition duration-300 shadow-lg"
              >
                <FaLinkedinIn />
              </a>
            </div>

            <div className="mt-6 text-gray-400 text-sm space-y-2">
              <p>📧 support@sancart.com</p>
              <p>📞 +91 8146774370</p>
              <p>📍 Ludhiana, Punjab, India</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© 2026 ShopSphere. All Rights Reserved.</p>

          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
