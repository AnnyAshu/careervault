import React from "react";
import "../../styles/admindashboard.css";
import logo from "../../assets/images/dashboard-logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();   // ✅ FIX: navigate defined here

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");  // redirect to login
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="CareerVault Logo" className="sidebar-logo" />
        </div>

        <ul className="sidebar-menu">

          <li>
            <NavLink
              to="/dashboard/admindashboard"
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <span>🏠</span> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
              <span>👤</span> Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/jobs"
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <span>📄</span> Applications
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <span>📘</span> My Courses
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/job-listings"
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <span>📄</span> Job Listings
            </NavLink>
          </li>

          {/* LOGOUT BUTTON */}
          <li>
            <button className="menu-item btn-logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </li>

        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard Overview</h1>
          <span className="welcome-box">Welcome back, User Name!</span>
        </div>

        {/* Stats Cards */}
        <div className="cards-grid">

          <div className="stat-card">
            <p className="card-title">Total Applications</p>
            <p className="card-count">122</p>
          </div>

          <div className="stat-card">
            <p className="card-title">Interviews Scheduled</p>
            <p className="card-count">120</p>
          </div>

          <div className="stat-card">
            <p className="card-title">Saved Jobs</p>
            <p className="card-count">36%</p>
          </div>

          <div className="stat-card">
            <p className="card-title">Learning Hours</p>
            <p className="card-count">131</p>
          </div>

          <div className="stat-card">
            <p className="card-title">React Learning Hours</p>
            <p className="card-count">101</p>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>🔔 New Job Alert: Senior Software Developer, London.</li>
            <li>📊 Profile Completion is now 90%.</li>
            <li>📘 You started: Advanced React Hooks.</li>
            <li>🗣 Feedback received for “Tech Solutions Inc.”</li>
          </ul>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
