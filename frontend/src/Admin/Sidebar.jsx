// Sidebar.jsx - Clean & Improved Admin Sidebar
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdminLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    navigate("/loginadmin");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
      path: "/admin/adminDashboard",
    },
    { label: "User List", icon: "fas fa-users", path: "/admin/userlist" },
    {
      label: "Add Product",
      icon: "fas fa-plus-circle",
      path: "/admin/addproduct",
    },
    { label: "Product List", icon: "fas fa-boxes", path: "/admin/productlist" },
  ];

  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b bg-blue-50">
            <span className="text-xl font-bold text-blue-600">Admin Panel</span>
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
          <nav className="mt-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center px-6 py-3 cursor-pointer transition-colors duration-200 font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }`}
                >
                  <i className={`${item.icon} mr-3 text-blue-400`}></i>
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mb-4">
          <li
            onClick={handleAdminLogout}
            className="flex items-center px-6 py-3 cursor-pointer hover:bg-red-50 text-gray-700 hover:text-red-600 font-medium"
          >
            <i className="fas fa-sign-out-alt mr-3 text-red-400"></i>
            Logout
          </li>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
