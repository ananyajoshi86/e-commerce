// AdminDashboard.jsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Stats from "./Stats";

export default function AdminDashboard() {
  useEffect(() => {
    // Optional: animations, analytics, etc.
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Page Content goes here */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to Admin Dashboard
          </h1>
          <Stats />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
