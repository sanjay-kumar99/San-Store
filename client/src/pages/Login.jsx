/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ecommerce-api-nu2d.onrender.com/api/auth/login",
        {
          email,
          password,
        },
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data);

        Swal.fire({
          icon: "success",
          title: "Welcome Back 👋",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(
          res.data.role?.toLowerCase() === "admin" ? "/admindashboard" : "/",
        );
      }
    } catch (error) {
      Swal.fire(
        "Login Failed",
        error.response?.data?.message || "Invalid credentials",
        "error",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <motion.div
        className="w-full max-w-md rounded-4xl border border-amber-400/20 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-center text-3xl font-semibold text-amber-300 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-amber-300 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          New here?{" "}
          <a href="/register" className="text-amber-300 hover:text-amber-200">
            Create account
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
