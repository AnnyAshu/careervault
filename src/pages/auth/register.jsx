import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";
import logo from "../../assets/images/careerVaultLogo.png";
import registerArt from "../../assets/images/register_art2.png"; // NEW IMAGE
import { useAuth } from "../../context/authcontext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //-------- OnSubmit ------------//
const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setBusy(true);

  try {
    const result = await register(username, email, password);

    if (result?.success) {
      setSuccess(result.message || "Registration successful!");

      // Optional: 2 sec baad login page par redirect kar do
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
    } else {
      setError(result?.message || "Something went wrong!");
    }

  } catch (err) {
    setError("Invalid credentials or server error.");
  } finally {
    setBusy(false);
  }
};


  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   navigate("/login");
  // };

  return (
    <div className="reg-wrapper">
      {/* LEFT SIDE */}
      <div className="reg-left">
        <img src={registerArt} alt="illustration" className="reg-art" />
      </div>

      {/* RIGHT SIDE */}
      <div className="reg-right">
        <div className="reg-card">
          <img src={logo} className="reg-logo" />

          <h2>Create Your Account</h2>
          {error && <div className="cv-error">{error}</div>}
          {success && <div className="cv-success">{success}</div>}
          <form onSubmit={onSubmit} className="reg-form" autoComplete="off">
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button type="submit">CREATE ACCOUNT</button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
