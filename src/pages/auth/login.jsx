import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import { useForm } from "react-hook-form";
import "../../styles/login.css";

import logo from "../../assets/images/careerVaultLogo.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    setBusy(true);

    try {
      const { username, password } = data;
      const result = await login(username, password);

      let roles = result?.roles;

      if (!roles || roles.length === 0) {
        setBusy(false);
        return setError("User role not found. Contact admin.");
      }

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
    <div className="cv-login-wrapper">
      <div className="cv-login-centre">
        <div className="cv-login-card">
          <img src={logo} alt="CareerVault" className="cv-logo" />
          <div className="cv-header-text">
            <h2 className="cv-login-heading">Unlock Your Vault</h2>
            <p className="cv-subtitle">Enter your credentials to access your career profile.</p>
          </div>
          {/* <h2 className="cv-login-heading">Login to Your Account</h2> */}

          {error && <div className="cv-error">{error}</div>}

          <form
            className="cv-form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="input-field-container">
              <label className="cv-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="cv-input"
                type="text"
                placeholder="Enter username"
                {...register("username", {
                  required: "Username is required!",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Only letters and numbers allowed",
                  },
                })}
              />
              {errors.username && (
                <span className="error-msg">{errors.username.message}</span>
              )}
            </div>

            <div className="input-field-container">
              <label className="cv-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="cv-input"
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "At least 6 characters required",
                  },
                })}
              />
              {errors.password && (
                <span className="error-msg">{errors.password.message}</span>
              )}
            </div>

            <button className="cv-btn" type="submit" disabled={busy}>
              {busy ? "Signing in..." : "ENTER VAULT"}
            </button>
            <div className="cv-login-text">
              <div className="cv-links">
                <Link to="/resetpassword">Forgot Password?</Link>
                <span> · </span>
                <Link to="/register">Create Account</Link>
              </div>
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
