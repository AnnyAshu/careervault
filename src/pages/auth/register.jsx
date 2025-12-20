import React, { useState } from "react";
import "../../styles/register.css";
import logo from "../../assets/images/careerVaultLogo.png";
import girlArt from "../../assets/images/girl_register.png";
import { useAuth } from "../../context/authcontext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", // important for live validation
  });

  const { userregister } = useAuth();

  // 1. Initial State Object
  // const initialState = {
  //   username: "",
  //   fullname: "",
  //   email: "",
  //   mobileno: "",
  //   gender: "",
  //   password: "",
  //   confirm: "",
  // };

  // const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  // 2. Generic Change Handler
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // 3. One Function to Reset Everything
  // const resetForm = () => {
  //   setFormData(initialState);
  // };

  const onSubmit = async (data) => {
    //e.preventDefault();
    setError("");
    setSuccess("");
    setBusy(true);

    const { username, fullname, email, mobileno, gender, password, confirm } =
      data;

    // const usernameRegex = /^[A-Za-z0-9]+$/;
    // if (!usernameRegex.test(username)) {
    //   setError("Username can contain only letters and numbers.");
    //   setBusy(false);
    //   return;
    // }

    // const nameRegex = /^[A-Za-z ]+$/;
    // if (!nameRegex.test(fullname.trim())) {
    //   setError("Full Name must contain only letters.");
    //   setBusy(false);
    //   return;
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email.trim())) {
    //   setError("Please enter a valid email address.");
    //   setBusy(false);
    //   return;
    // }

    // if (!mobileno.trim() || mobileno.length !== 10) {
    //   setError("Enter a valid 10-digit mobile number.");
    //   setBusy(false);
    //   return;
    // }

    // if (!gender) {
    //   setError("Please select your gender.");
    //   setBusy(false);
    //   return;
    // }

    // if (password.length < 8) {
    //   setError("Password must be at least 8 characters.");
    //   setBusy(false);
    //   return;
    // }

    // if (password !== confirm) {
    //   setError("Password and Confirm Password do not match.");
    //   setBusy(false);
    //   return;
    // }

    try {
      const result = await userregister(
        username,
        fullname,
        email,
        password,
        gender,
        mobileno
      );

      if (result?.success) {
        // setSuccess(result.message || "Registration successful!");
        toast.success(result.message);
        reset();
        //resetForm();
        //       setTimeout(() => {
        //   setSuccess("");
        // }, 5000);
      } else {
        toast.error(result?.message || "Something went wrong!");
        //setError(result?.message || "Something went wrong!");
      }
    } catch {
      toast.error("Server unavailable. Try again later.");
      // setError("Server unavailable. Try again later.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="regnew-wrapper">
      <Toaster position="top-center" reverseOrder={false} />
      {/* LEFT WHITE CARD */}
      <div className="regnew-centre">
        <div className="regnew-card">
          <img src={logo} className="regnew-logo" alt="CareerVault" />

          <h2>Create Your Account</h2>

          {error && <div className="regnew-error">{error}</div>}
          {success && <div className="regnew-success">{success}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="regnew-form">
            <div className="input-field-container">
              <input
                type="text"
                placeholder="User Name"
                // value={formData.username}
                // onChange={handleChange}
                name="username"
                {...register("username", {
                  required: "please enter username!",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "enter a valid username",
                  },
                })}
              />
              {errors.username && (
                <span className="error-msg">{errors.username.message}</span>
              )}
            </div>
            <div className="input-field-container">
              <input
                type="text"
                placeholder="Full Name"
                // value={formData.fullname}
                // onChange={handleChange}
                name="fullname"
                {...register("fullname", {
                  required: "please enter fullname!",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "please enter valid name",
                  },
                })}
              />
              {errors.fullname && (
                <span className="error-msg">{errors.fullname.message}</span>
              )}
            </div>
            <div className="input-field-container">
              <input
                type="email"
                placeholder="Email Address"
                // value={formData.email}
                // onChange={handleChange}
                name="email"
                {...register("email", {
                  required: "please enter email!",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: "enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="error-msg">{errors.email.message}</span>
              )}
            </div>

            <div className="regnew-row">
              <div className="input-field-container">
                <input
                  type="password"
                  placeholder="Password"
                  // value={formData.password}
                  // onChange={handleChange}
                  name="password"
                  {...register("password", {
                    required: "password is required!",
                    minLength: {
                      value: 6,
                      message: "atleast 6 characters is required!",
                    },
                    pattern: {
                      value: /^[0-9A-Za-z .$@#]{6,30}/,
                      message:
                        "only alphabets,digit,space,.,$,#,@ is acceptable and length must be 6-30 characters ",
                    },
                  })}
                />
                {errors.password && (
                  <span className="error-msg">{errors.password.message}</span>
                )}
              </div>
              <div className="input-field-container">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm", {
                    required: "confirm password is required!",
                    validate: (value) =>
                      value === watch("password") || "passwords do not match",
                  })}
                  // value={formData.confirm}
                  // onChange={handleChange}
                  name="confirm"
                  // {...register("confirm", {
                  //   required: "please enter confirm password!",
                  // })}
                />
                {errors.confirm && (
                  <span className="error-msg">{errors.confirm.message}</span>
                )}
              </div>
            </div>
            <div className="input-field-container">
              <select
                className="regnew-select"
                name="gender"
                // value={formData.gender}
                // onChange={handleChange}
                {...register("gender", {
                  required: "please select gender!",
                  message: "please select gender!",
                })}
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {errors.gender && (
                <span className="error-msg">{errors.gender.message}</span>
              )}
            </div>
            <div className="input-field-container">
              <input
                type="text" 
                inputMode="numeric"
                placeholder="Mobile Number"
                maxLength={10} 
                {...register("mobileno", {
                  required: "Please enter mobile number!",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message:
                      "Please enter a valid 10-digit number starting with 6-9",
                  },
                  onChange: (e) => {
                    const val = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numbers
                    e.target.value = val.slice(0, 10); // Ensure max 10 characters
                  },
                })}
              />
              {errors.mobileno && (
                <span className="error-msg">{errors.mobileno.message}</span>
              )}
            </div>

            <button type="submit" disabled={busy}>
              {busy ? "Please wait......" : "Register"}
            </button>
          </form>

          <p className="regnew-login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
