import React, { useState } from "react";
import "../../styles/register.css";
import logo from "../../assets/images/careerVaultLogo.png";
import girlArt from "../../assets/images/girl_register.png"; 
import { useAuth } from "../../context/authcontext";

const Register = () => {
  const { register } = useAuth();

  const [username, setusername] = useState("");
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileNo] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setBusy(true);

    const usernameRegex = /^[A-Za-z0-9]+$/;
    if (!usernameRegex.test(username)) {
      setError("Username can contain only letters and numbers.");
      setBusy(false);
      return;
    }

    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(fullname.trim())) {
      setError("Full Name must contain only letters.");
      setBusy(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
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

    try {
      const result = await register(
        username,
        fullname,
        email,
        password,
        gender,
        mobileno
      );

      if (result?.success) {
        setSuccess(result.message || "Registration successful!");
        setusername("");
        setfullname("");
        setEmail("");
        setMobileNo("");
        setGender("");
        setPassword("");
        setConfirm("");
      } else {
        setError(result?.message || "Something went wrong!");
      }
    } catch {
      setError("Server unavailable. Try again later.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="regnew-wrapper">

      {/* LEFT WHITE CARD */}
      <div className="regnew-left">
        <div className="regnew-card">
          <img src={logo} className="regnew-logo" alt="CareerVault" />

          <h2>Create Your Account</h2>

          {error && <div className="regnew-error">{error}</div>}
          {success && <div className="regnew-success">{success}</div>}

          <form onSubmit={onSubmit} className="regnew-form">
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
              placeholder="Re-type Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <div className="regnew-row">
              <input
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setfullname(e.target.value)}
              />
            </div>

            <div className="regnew-radio">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>

            <input
              type="number"
              placeholder="Mobile Number"
              value={mobileno}
              onChange={(e) => setMobileNo(e.target.value)}
            />

            <button type="submit" disabled={busy}>
              {busy ? "Please wait..." : "Register"}
            </button>
          </form>

          <p className="regnew-login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>

      {/* RIGHT ILLUSTRATION */}
      <div className="regnew-right">
        <img src={girlArt} alt="illustration" className="regnew-art" />
      </div>
    </div>
  );
};

export default Register;
