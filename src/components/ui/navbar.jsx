import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { isAdmin, isRecruiter } from "../../utils/roleHelper";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">CareerVault</Link>

      <div className="ms-auto d-flex align-items-center">
        {user ? (
          <>
            <span className="text-light me-3">Hi, {user?.name || user?.email}</span>
            <Link className="btn btn-sm btn-outline-light me-2" to={isAdmin(user) ? "/admin/dashboard" : "/dashboard"}>
              Dashboard
            </Link>
            <button className="btn btn-sm btn-danger" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link className="btn btn-sm btn-outline-light" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
