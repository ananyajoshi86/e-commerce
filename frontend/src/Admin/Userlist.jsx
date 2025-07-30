import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Userlist() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user/allusers", {
          withCredentials: true,
        });
        const data = res.data;
        if (Array.isArray(data.data)) {
          setUsers(data.data);
        } else if (data.data && typeof data.data === "object") {
          setUsers([data.data]);
        } else {
          setUsers([]);
        }
      } catch (error) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name && user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">User List</h2>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr
                    key={user._id || idx}
                    className="border-t hover:bg-blue-50"
                  >
                    <td className="p-3">
                      <img
                        src={
                          user.img && user.img.path
                            ? user.img.path
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                              )}&background=0D8ABC&color=fff&rounded=true`
                        }
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
