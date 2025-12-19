import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../styles/login.css"; // Reusing login styles for consistency
import logo from "../../assets/images/careerVaultLogo.png";
import { useAuth } from "../../context/authcontext";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });

  const { sendResetPassword } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    setMessage("");
    setBusy(true);

    try {
      const {email}=data;
      const result = await sendResetPassword(email);
      console.log("Sending reset link to:",email);
      reset();
      setMessage("Reset link sent! Please check your email inbox.");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (err) {
      setError("Failed to send reset link. Try again later.");
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
            <h2 className="cv-login-heading">Recover Your Vault</h2>
            <p className="cv-subtitle">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {error && <div className="cv-error">{error}</div>}
          {message && <div className="cv-success-alert">{message}</div>}

          <form className="cv-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field-container">
              <label className="cv-label">Email Address</label>
              <input
                className="cv-input"
                type="email"
                placeholder="name@company.com"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="error-msg">{errors.email.message}</span>
              )}
            </div>

            <button className="cv-btn" type="submit" disabled={busy}>
              {busy ? "Sending..." : "SEND RESET LINK"}
            </button>
            <div className="cv-login-text">
            <div className="cv-links">
              <Link to="/login">Back to Login</Link>
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

export default ForgotPassword;
