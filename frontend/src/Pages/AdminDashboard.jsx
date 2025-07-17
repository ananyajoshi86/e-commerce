import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SidebarLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`block px-4 py-2 rounded transition ${
      active
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
    }`}
  >
    {children}
  </Link>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login");
    }
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setStats({
          products: data.products || 0,
          users: data.users || 0,
          orders: data.orders || 0,
        });
      } catch {
        setStats({ products: 0, users: 0, orders: 0 });
      }
      setLoading(false);
    };
    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col py-6">
        <div className="px-6 pb-6 border-b">
          <h2 className="text-xl font-bold text-blue-700">Admin Panel</h2>
        </div>
        <nav className="flex-1 mt-6 flex flex-col gap-2">
          <SidebarLink
            to="/admin/dashboard"
            active={location.pathname === "/admin/dashboard"}
          >
            Dashboard
          </SidebarLink>
          <SidebarLink
            to="/admin/products"
            active={location.pathname === "/admin/products"}
          >
            Manage Products
          </SidebarLink>
          <SidebarLink
            to="/admin/users"
            active={location.pathname === "/admin/users"}
          >
            Manage Users
          </SidebarLink>
        </nav>
        <button
          onClick={handleLogout}
          className="mx-4 mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-blue-700">
                {stats.products}
              </span>
                <span className="mt-2 text-lg text-gray-700">Total Products{ stats.users.toLocaleString()}</span>
            </div>
            <div className="bg-white rounded shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-green-700">
                {stats.users}
              </span>
              <span className="mt-2 text-lg text-gray-700">Total Users</span>
            </div>
            <div className="bg-white rounded shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-purple-700">
                {stats.orders}
              </span>
              <span className="mt-2 text-lg text-gray-700">Total Orders</span>
            </div>
          </div>
        )}
        <div className="mb-4">
          <p>
            Welcome to the admin dashboard. Use the sidebar to manage products
            and users.
          </p>
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;
