/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password || form.password.length < 6)
      errs.password = "Min 6 characters required";
    if (form.confirmPassword !== form.password)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const { data } = await axios.post("/auth/register", form);

      Swal.fire({
        icon: "success",
        title: "Welcome to SanC@rt ✨",
        text: `Hi ${data.name}, account created successfully!`,
      });

      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <motion.div
        className="w-full max-w-md rounded-[2rem] border border-amber-400/20 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-center text-3xl font-semibold text-amber-300 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                {field.toUpperCase()}
              </label>
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
              />
              {errors[field] && (
                <p className="mt-2 text-sm text-rose-400">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded-3xl bg-amber-300 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="text-amber-300 hover:text-amber-200">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
