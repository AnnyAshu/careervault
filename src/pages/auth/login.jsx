import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";   // ⬅️ Added Link
import { useAuth } from "../../context/authcontext";
import "../../styles/login.css";

import logo from "../../assets/images/careerVaultLogo.png";
import bookside from "../../assets/images/bookmark_side.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setBusy(true);

  try {
    const result = await login(username, password);

    console.log("Login response:", result);

    // result.roles = ["Admin"]
    let roles = result?.roles;

    if (!roles || roles.length === 0) {
      return setError("User role not found. Contact admin.");
    }

    // Extract first role (if only one)
    let role = roles[0].toLowerCase();

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "user") {
      navigate("/user/dashboard");
    } else {
      setError("Unauthorized role.");
    }

  } catch (err) {
    setError("Invalid credentials or server error.");
  } finally {
    setBusy(false);
  }
};


  return (
    <div className="cv-login-root">
      <div className="cv-login-bg" />

      <div className="cv-login-card">
        <div className="cv-left-illustration" aria-hidden="true">
          <img src={bookside} />
        </div>

        <div className="cv-right-form">
          <img src={logo} alt="CareerVault" className="cv-logo" />

          {error && <div className="cv-error">{error}</div>}

          <form className="cv-form" onSubmit={onSubmit} autoComplete="off">

            <div className="cv-form-group">
              <label className="cv-label" htmlFor="username">Username</label>
              <input
                id="username"
                className="cv-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="cv-form-group">
              <label className="cv-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="cv-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="cv-btn" type="submit" disabled={busy}>
              {busy ? "Signing in..." : "LOGIN"}
            </button>

            {/* UPDATED LINKS */}
            <div className="cv-links">
              <Link to="/forgot">Forgot Password?</Link>
              <span> · </span>
              <Link to="/register">Create Account</Link>
            </div>
          </form>

          <div className="cv-footer">
            © {new Date().getFullYear()} CareerVault
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
