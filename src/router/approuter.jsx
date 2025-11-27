import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login";
import AdminDashboard from "../pages/dashboard/admindashboard";
import UserDashboard from "../pages/dashboard/userdashboard";
import RecruiterDashboard from "../pages/dashboard/RecruiterDashboard";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin routes (sidebar layout) */}
        <Route path="/admin" element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* /admin/users and others will be added later */}
        </Route>

        {/* Recruiter (can reuse AdminLayout or create its own) */}
        <Route path="/recruiter" element={
          <ProtectedRoute roles={["Recruiter"]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<RecruiterDashboard />} />
        </Route>

        {/* User routes (simple layout) */}
        <Route path="/" element={
          <ProtectedRoute roles={["User","Admin","Recruiter"]}>
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
