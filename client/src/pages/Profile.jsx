/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f7fa] py-16">
      <div className="max-w-4xl mx-auto px-5">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-blue-600 text-white flex items-center justify-center rounded-full text-3xl font-bold">
              {user.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {user.name}
              </h2>
              <p className="text-slate-600">{user.email}</p>
              <p className="text-slate-500 text-sm mt-1">
                Role: {user.role || "User"}
              </p>
            </div>

            <div className="ml-auto">
              <Link
                to="/profile/edit"
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* DETAILS */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-semibold">{user._id}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-semibold">{user.role || "User"}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Profile;