import React from "react";
import { Link } from "react-router-dom";
import { isAdmin, isRecruiter } from "../../utils/roleHelper";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-light vh-100 p-3" style={{ minWidth: 220 }}>
      <h5 className="mb-4">Menu</h5>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/dashboard">My Dashboard</Link>
        </li>

        {isAdmin(user) && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/admin/dashboard">Admin Overview</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/admin/users">Manage Users</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/admin/jobs">Manage Jobs</Link>
            </li>
          </>
        )}

        {isRecruiter(user) && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/recruiter/dashboard">Recruiter Panel</Link>
            </li>
          </>
        )}

        <li className="nav-item mt-3">
          <Link className="nav-link text-muted" to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
