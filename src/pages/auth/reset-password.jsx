import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../styles/login.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

const onSubmit = async (data) => {
    const {password}=data;
  setBusy(true);
  try {
    
    const response = await fetch("https://localhost:7152/api/auth/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        email: email,
        newPassword: password 
      }),
    });

    if (response.ok) {
      setStatus({ type: "success", msg: "Password updated! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 3000);
    } else {
      const errorData = await response.json();
      setStatus({ type: "error", msg: errorData.message || "Invalid or expired token." });
    }
  } catch (err) {

    setStatus({ type: "error", msg: "Server error. Try again later." });
  } finally {
    setBusy(false);
  }
};

  return (
        <div className="cv-login-wrapper">
      <div className="cv-login-centre">
        <div className="cv-login-card">
          <div className="cv-header-text">
  <h2 className="cv-login-heading">Set New Password</h2>
  <p className="cv-subtitle">
    For security, enter a strong password for <br />
    <span className="cv-email-highlight">{email}</span>
  </p>
</div>
          {status.msg && (
            <div className={status.type === "success" ? "cv-success-alert" : "cv-error"}>
              {status.msg}
            </div>
          )}

          <form className="cv-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field-container">
              <input
                type="password"
                placeholder="New Password"
                className="cv-input"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "At least 6 characters required",
                  },
                })}
              />
              {errors.password && <span className="error-msg">{errors.password.message}</span>}
            </div>

            <div className="input-field-container">
              <input
                type="password"
                placeholder="Confirm New Password"
                className="cv-input"
                name="confirmPassword"
                {...register("confirmPassword", {
                    required: "confirm password is required!",
                    validate: (value) =>
                      value === watch("password") || "passwords do not match",
                  })}
              />
              {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword.message}</span>}
            </div>

            <button className="cv-btn" type="submit" disabled={busy}>
              {busy ? "Updating..." : "RESET PASSWORD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;