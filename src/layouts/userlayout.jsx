import React from "react";
import Navbar from "../components/ui/navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="container-fluid p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
