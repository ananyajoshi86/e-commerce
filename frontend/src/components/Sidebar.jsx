import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const menuItems = [
    { label: "Stats", icon: "fas fa-chart-line", path: "/adminSidebar/stats" },
    { label: "User List", icon: "fas fa-users", path: "/adminSidebar/userlist" },
    {
      label: "Add Product",
      icon: "fas fa-plus-circle",
      path: "/adminSidebar/addproduct",
    },
    {
      label: "Product List",
      icon: "fas fa-boxes",
      path: "/adminSidebar/productlist",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b bg-blue-50">
            <span className="text-xl font-bold text-blue-600 tracking-wide">
              Admin Panel
            </span>
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className="flex items-center px-6 py-3 cursor-pointer hover:bg-blue-100 transition-colors duration-200 font-medium text-gray-700 hover:text-blue-600"
                >
                  <i className={`${item.icon} mr-3 text-blue-400`}></i>
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="mb-4">
          <li
            onClick={handleAdminLogout}
            className="flex items-center px-6 py-3 cursor-pointer hover:bg-red-50 text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            <i className="fas fa-sign-out-alt mr-3 text-red-400"></i>
            Logout
          </li>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Topbar for Mobile */}
      <div className="flex-1">
        <div className="lg:hidden flex items-center bg-white shadow px-4 py-4 sticky top-0 z-10">
          <button
            className="text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <span className="ml-4 text-lg font-semibold text-blue-600">
            Admin Dashboard
          </span>
        </div>
      </div>
    </div>
  );
}
