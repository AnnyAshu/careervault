

import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const roles = localStorage.getItem("roles");

    return token ? { token, username, roles } : null;
  });

  // LOGIN FUNCTION
  const login = async (username, password) => {
    const response = await axios.post("https://localhost:7152/api/auth/login", {
      Username: username,
      Password: password
    });

    const data = response.data;

    // Save in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    // localStorage.setItem("roles", data.roles);
    localStorage.setItem("roles", JSON.stringify(data.roles));

    const userData = {
      token: data.token,
      username: data.username,
      roles: data.roles   // roles example: "admin" or "user"
    };

    setUser(userData);

    // 🔥 IMPORTANT → Login.js requires this return
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);



// // src/context/authcontext.jsx

// import { createContext, useContext, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();  // <-- IMPORTANT export

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const token = localStorage.getItem("token");
//     const username = localStorage.getItem("username");
//    const roles = localStorage.getItem("roles");
//     console.log(roles);
//     return token ? { token, username,roles } : null;
//   });

//   // LOGIN FUNCTION (Backend format: Username, Password)
//   const login = async (username, password) => {
//     const response = await axios.post(
//       "https://localhost:7152/api/auth/login",
//       {
//         Username: username,   // backend expects capital "Username"
//         Password: password    // capital "Password"
//       }
//     );

//     const data = response.data;

//     // Save token + username
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("username", data.username);
//     localStorage.setItem("roles", data.roles);
//     setUser({
//       token: data.token,
//       username: data.username,
//       roles:data.roles
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("roles");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook
// export const useAuth = () => useContext(AuthContext);
