import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const { data } = await axios.post(url, formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "admin") navigate("/admin");
      else navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // 🔥 MOCK SOCIAL LOGIN (future backend connect hoga)
  const handleGoogleLogin = () => {
    alert("Google login coming soon 🚀");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login coming soon 🚀");
  };

  return (
    <section className="min-h-screen flex">

      {/* LEFT FORM */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">

          <h2 className="text-3xl font-bold mb-6 text-center">
            {isLogin ? "Sign in" : "Create Account"}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {/* SOCIAL LOGIN (FIXED SECTION) */}
          <div className="mt-6 space-y-3">

            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-slate-100 transition"
            >
              <FaFacebook className="text-blue-600" />
              Continue with Facebook
            </button>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-slate-100 transition"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>

          </div>

          {/* SWITCH */}
          <p className="text-center mt-6">
            {isLogin ? "New user?" : "Already have account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:flex flex-1 bg-gray-100 items-center justify-center">
        <img
          src="/banner/auth.jpg"
          className="w-full h-full object-cover"
          alt="auth"
        />
      </div>

    </section>
  );
};

export default Auth;