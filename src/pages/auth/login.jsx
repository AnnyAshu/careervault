
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      await login(username, password);
      navigate("/admin/dashboard");
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

            <div className="cv-links">
              <a href="/forgot">Forgot Password?</a>
              <span> · </span>
              <a href="/register">Create Account</a>
            </div>
          </form>

          <div className="cv-footer">© {new Date().getFullYear()} CareerVault</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
