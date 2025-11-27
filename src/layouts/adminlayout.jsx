import React from "react";
import Navbar from "../components/ui/navbar";
import Sidebar from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
