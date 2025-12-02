import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authcontext.jsx";
import ProtectedRoute from "./routes/protectedroute.jsx";

import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import AdminDashboardLayout from "./pages/layout/admindashboardlayout.jsx";

import DashboardHome from "./pages/dashboard/admindashboard.jsx";
import DashboardHome from "./pages/dashboard/userdashboard.jsx";
import Profile from "./pages/profile/userprofile.jsx";
import MyCourses from "./pages/courses/mycourses.jsx";
import Applications from "./pages/applications/applications.jsx";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />
          {/* Register */}
          <Route path="/register" element={<Register />} />

          {/* ADMIN LAYOUT */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboardLayout /></ProtectedRoute>}>

            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="applications" element={<Applications />} />
          </Route>
          {/* User LAYOUT */}
          <Route path="/user" element={<ProtectedRoute><AdminDashboardLayout /></ProtectedRoute>}>

            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

