import React, { useState } from "react";
import "../../styles/register.css";
import logo from "../../assets/images/careerVaultLogo.png";
import girlArt from "../../assets/images/girl_register.png";
import { useAuth } from "../../context/authcontext";

const Register = () => {
  const { register } = useAuth();

  // 1. Initial State Object
  const initialState = {
    username: "",
    fullname: "",
    email: "",
    mobileno: "",
    gender: "",
    password: "",
    confirm: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  // 2. Generic Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. One Function to Reset Everything
  const resetForm = () => {
    setFormData(initialState);
  };
 

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setBusy(true);

    const { username, fullname, email, mobileno, gender, password, confirm } =
      formData;

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
        resetForm();
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
      <div className="regnew-centre">
        <div className="regnew-card">
          <img src={logo} className="regnew-logo" alt="CareerVault" />

          <h2>Create Your Account</h2>

          {error && <div className="regnew-error">{error}</div>}
          {success && <div className="regnew-success">{success}</div>}

          <form onSubmit={onSubmit} className="regnew-form">
            <input
              type="text"
              placeholder="User Name"
              value={formData.username}
              onChange={handleChange}
              name="username"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullname}
              name="fullname"
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />

            <div className="regnew-row">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />

              <input
                type="password"
                placeholder="Re-type Password"
                value={formData.confirm}
                name="confirm"
                onChange={handleChange}
              />
            </div>
            <select
              className="regnew-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* <div className="regnew-radio">
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
</div> */}

            <input
              type="number"
              placeholder="Mobile Number"
              value={formData.mobileno}
              name="mobileno"
              onChange={handleChange}
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
      {/* <div className="regnew-right">
        <img src={girlArt} alt="illustration" className="regnew-art" />
      </div> */}
    </div>
  );
};

export default Register;
