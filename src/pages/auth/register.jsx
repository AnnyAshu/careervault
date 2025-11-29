import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";

import logo from "../../assets/images/careerVaultLogo.png";
import registerArt from "../../assets/images/register_art2.png";   // NEW IMAGE

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
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

          <form onSubmit={handleRegister} className="reg-form">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../styles/register.css";

// import logo from "../../assets/images/careerVaultLogo.png";
// import registerArt from "../../assets/images/register_art.png"; // add any illustration

// const Register = () => {
//   const navigate = useNavigate();

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();
//     navigate("/login");
//   };

//   return (
//     <div className="reg-container">

//       <div className="reg-left">
//         <img src={logo} className="reg-logo" />

//         <div className="reg-glass-card">
//           <h2>Create Your Account</h2>

//           <form onSubmit={handleRegister} className="reg-form">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />

//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               required
//             />

//             <button type="submit">Create Account</button>
//           </form>

//           <p className="reg-login-text">
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </div>
//       </div>

//       <div className="reg-right">
//         <img src={registerArt} alt="illustration" className="reg-illustration" />
//       </div>

//     </div>
//   );
// };

// export default Register;
