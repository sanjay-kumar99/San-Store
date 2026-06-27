/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/EditProfile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update localStorage
      localStorage.setItem("user", JSON.stringify(data));

      alert("Profile Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f7fa] py-16">
      <div className="max-w-xl mx-auto px-5">

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-xl"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default EditProfile;