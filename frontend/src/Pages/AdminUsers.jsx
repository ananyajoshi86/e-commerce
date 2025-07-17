// import React, { useEffect, useState } from "react";

// const MONGO_URL = "/api/user/all";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(MONGO_URL, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!res.ok) {
//         if (res.status === 401) {
//           alert("Unauthorized. Please login.");
//         } else {
//           throw new Error("Failed to fetch users");
//         }
//       }

//       const data = await res.json();
//       setUsers(data.users || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch users");
//     }
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user?")) return;
//     try {
//       await fetch(`/api/user/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       fetchUsers();
//     } catch {
//       alert("Failed to delete user");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch("/api/user/allusers");
//       }
//     }
//   })
//   const filteredUsers = users.filter(
//     (user) => user.name && user.name.toLowerCase().includes(search.toLowerCase())
//   );
//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-2 py-1">Name</th>
//               <th className="border px-2 py-1">Email</th>
//               <th className="border px-2 py-1">Role</th>
//               <th className="border px-2 py-1">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u._id}>
//                 <td className="border px-2 py-1">{u.name}</td>
//                 <td className="border px-2 py-1">{u.email}</td>
//                 <td className="border px-2 py-1">
//                   {u.isAdmin ? "Admin" : "User"}
//                 </td>
//                 <td className="border px-2 py-1">
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                     onClick={() => handleDelete(u._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-4">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;

import React, { useState, useEffect } from "react";

export default function Userlist() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/allusers");
        const data = await res.json();

        if (Array.isArray(data.data)) {
          setUsers(data.data);
        } else if (data.data && typeof data.data === "object") {
          setUsers([data.data]);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
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
        <h2 className="text-5xl font-semibold text-blue-600 mb-6">User List</h2>

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
                    className="px-6 py-3 text-left text-sm font-medium text-black-500 uppercase tracking-wider"
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
