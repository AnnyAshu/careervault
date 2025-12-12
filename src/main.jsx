import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./LandingPage";
import { AuthProvider } from "./context/authcontext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LandingPage />
  </AuthProvider>
);





