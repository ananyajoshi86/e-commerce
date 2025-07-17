import React, { useState, useEffect } from "react";

export default function Userlist() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/allusers");
        if (Array.isArray(res.data.data)) {
          setUsers(res.data.data);
        } else if (res.data.data && typeof res.data.data === "object") {
          setUsers([res.data.data]);
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
    <div className="p-8 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">User List</h2>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search by name..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                {["Image", "Name", "Email"].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-sm font-medium text-blue-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr
                    key={user._id || idx}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={
                          user.img?.path
                            ? `/uploads/${user.img.path}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                              )}&background=blue&color=fff&rounded=true`
                        }
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
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
