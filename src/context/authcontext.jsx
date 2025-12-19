

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

  // IMPORTANT: Check if the backend actually authenticated the user
  if (data.success) {
  
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("roles", JSON.stringify(data.roles));

    const userData = {
      success: true,
      token: data.token,
      username: data.username,
      roles: data.roles
    };

    setUser(userData);
    return userData; 
  } else {
    // If success is false (wrong password/user), return the error message
    return { success: false, message: data.message };
  }
};

  const userregister = async (username,fullname,email, password,gender,mobileno) => {
    const response = await axios.post("https://localhost:7152/api/auth/register", {
      Username: username,
      Fullname:fullname,
      email:email,
      Password: password,
      MobileNo:mobileno,
      Gender:gender
    });

    const data = response.data;
console.log("register response :" +data )


    return data;
  };


  const sendResetPassword = async (email) => {
    const response = await axios.post("https://localhost:7152/api/auth/sendresetpassword", {
      email:email
    });

    const data = response.data;
console.log("register response :" +data )


    return data;
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout ,userregister,sendResetPassword}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);



