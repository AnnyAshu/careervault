import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login.jsx";
import AdminDashboard from "./pages/dashboard/admindashboard.jsx";
import ProtectedRoute from "./routes/protectedroute.jsx";
import { AuthProvider } from "./context/authcontext.jsx";
import Profile from "./pages/profile/userprofile.jsx";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* DEFAULT ROUTE FIX */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          
          {/* Profile Page Route */}
          <Route path="/profile" element={<Profile />} />


          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
