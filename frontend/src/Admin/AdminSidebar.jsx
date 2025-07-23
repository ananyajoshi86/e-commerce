import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminSidebar = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminSidebar;
