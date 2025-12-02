import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authcontext.jsx";
import ProtectedRoute from "./routes/protectedroute.jsx";

import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import AdminDashboardLayout from "./pages/layout/admindashboardlayout.jsx";
import Unauthorized from "./pages/Unauthorized";
import DashboardHome from "./pages/dashboard/admindashboard.jsx";

import UserDashboard from "./pages/dashboard/userdashboard.jsx";
import UserDashboardLayout from "./pages/layout/userdashboardlayout.jsx";
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
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Register */}
          <Route path="/register" element={<Register />} />

          {/* ADMIN LAYOUT */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboardLayout /></ProtectedRoute>}>

            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="applications" element={<Applications />} />
          </Route>
          {/* User LAYOUT */}
          <Route path="/user" element={<ProtectedRoute allowedRoles={["user"]}><UserDashboardLayout /></ProtectedRoute>}>

            <Route index element={<UserDashboard />} />
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

