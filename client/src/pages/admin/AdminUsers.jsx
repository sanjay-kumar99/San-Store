/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await axios.get(`${API_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchUsers();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Users</h1>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium w-fit">
          Total Users : {users.length}
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100 text-slate-700 h-14">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="text-center border-b hover:bg-slate-50 transition h-20"
              >
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mt-5">
        {users.map((user) => (
          <div
            key={user._id}
            className="w-full min-w-0 border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg text-slate-800 wrap-break-word">
                  {user.name}
                </h2>

                <p className="text-sm text-slate-500 wrap-break-word mt-1">
                  {user.email}
                </p>
              </div>

              <span
                className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold`}
              >
                {user.role}
              </span>
            </div>

            <button
              onClick={() => deleteUser(user._id)}
              className="w-full mt-5 min-h-11 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium"
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
