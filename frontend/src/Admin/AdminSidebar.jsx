import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminSidebar = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminSidebar;
