

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

  const register = async (username,email, password) => {
    const response = await axios.post("https://localhost:7152/api/auth/register", {
      Username: username,
      email:email,
      Password: password
    });

    const data = response.data;
console.log("register response :" +data )
    // Save in localStorage
    // localStorage.setItem("token", data.token);
    // localStorage.setItem("username", data.username);
    // localStorage.setItem("roles", JSON.stringify(data.roles));

    // const userData = {
    //   token: data.token,
    //   username: data.username,
    //   roles: data.roles   // roles example: "admin" or "user"
    // };

    // setUser(userData);

    return data;
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout ,register}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);



