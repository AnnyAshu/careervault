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
  const [mobileno, setMobileNo] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  //-------- OnSubmit ------------//
 const onSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");
  setBusy(true);

  // ---------------------------
  //  VALIDATIONS
  // ---------------------------

  if (!username.trim()) {
    setError("Full Name is required.");
    setBusy(false);
    return;
  }

  if (!email.trim()) {
    setError("Email is required.");
    setBusy(false);
    return;
  }

  if (!mobileno.trim() || mobileno.length !== 10) {
    setError("Enter a valid 10-digit mobile number.");
    setBusy(false);
    return;
  }

  if (!gender) {
    setError("Please select your gender.");
    setBusy(false);
    return;
  }

  if (!password.trim()) {
    setError("Password is required.");
    setBusy(false);
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    setBusy(false);
    return;
  }

  if (password !== confirm) {
    setError("Password and Confirm Password do not match.");
    setBusy(false);
    return;
  }

  // ---------------------------
  //  AFTER ALL VALIDATIONS PASS  
  // ---------------------------

  try {
    const result = await register(username, email, password, gender, mobileno);

    if (result?.success) {
      setSuccess(result.message || "Registration successful!");
      // Optionally navigate
    } else {
      setError(result?.message || "Something went wrong!");
    }

  } catch (err) {
    if (!err.response) {
    // API server not reachable
    setError("Server temporarily unavailable. Please try again later.");
  } 
  else if (err.response.status === 401) {
    // wrong credentials
    setError("Invalid username or password.");
  } 
  else {
    // fallback
    setError("Something went wrong. Please try again.");
  }
  } finally {
    setBusy(false);
  }
};


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
          {error && <div className="reg-error">{error}</div>}
          {success && <div className="reg-success">{success}</div>}
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
              type="number"
              placeholder="Mobile Number"
              value={mobileno}
              onChange={(e) => setMobileNo(e.target.value)}
            />

            {/* Gender Dropdown */}
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

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
