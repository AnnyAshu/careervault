import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../styles/admindashboard.css";
import logo from "../../assets/images/dashboard-logo.png";

const AdminDashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>

        <ul className="sidebar-menu">

          <li>
            <NavLink to="/admin/dashboard" className="menu-item">
              🏠 Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/profile" className="menu-item">
              👤 Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/applications" className="menu-item">
              📄 Applications
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/courses" className="menu-item">
              📘 My Courses
            </NavLink>
          </li>

          <li>
            <button className="menu-item btn-logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </li>

        </ul>
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminDashboardLayout;
