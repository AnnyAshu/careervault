// src/context/authcontext.jsx

import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();  // <-- IMPORTANT export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return token ? { token, username } : null;
  });

  // LOGIN FUNCTION (Backend format: Username, Password)
  const login = async (username, password) => {
    const response = await axios.post(
      "https://localhost:7152/api/auth/login",
      {
        Username: username,   // backend expects capital "Username"
        Password: password    // capital "Password"
      }
    );

    const data = response.data;

    // Save token + username
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);

    setUser({
      token: data.token,
      username: data.username,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
