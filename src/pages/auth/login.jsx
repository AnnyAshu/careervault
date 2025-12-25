import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../styles/login.css";
import logo from "../../assets/images/careerVaultLogo.png";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const result = await dispatch(
      login({
        username: data.username,
        password: data.password,
      })
    );

    if (login.fulfilled.match(result)) {
      const roles = result.payload.roles?.map((r) => r.toLowerCase());

      if (roles?.includes("admin")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  };

  return (
    <div className="cv-login-wrapper">
      <div className="cv-login-centre">
        <div className="cv-login-card">
          <img src={logo} alt="CareerVault" className="cv-logo" />

          <div className="cv-header-text">
            <h2 className="cv-login-heading">Unlock Your Vault</h2>
            <p className="cv-subtitle">
              Enter your credentials to access your career profile.
            </p>
          </div>

          {error && <div className="cv-error">{error}</div>}

          <form
            className="cv-form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="input-field-container">
              <label className="cv-label">Username</label>
              <input
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
                <span className="error-msg">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="input-field-container">
              <label className="cv-label">Password</label>
              <input
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
                <span className="error-msg">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button className="cv-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "ENTER VAULT"}
            </button>

            <div className="cv-login-text">
              <div className="cv-links">
                <Link to="/forgotpassword">Forgot Password?</Link>
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
