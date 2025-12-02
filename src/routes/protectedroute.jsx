import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Read roles safely
  const stored = localStorage.getItem("roles");
  const storedRoles = stored ? JSON.parse(stored) : null;

  // If not logged in
  if (!storedRoles) return <Navigate to="/login" replace />;

  // Convert roles to lowercase for consistent comparison
  const userRoles = storedRoles.map(role => role.toLowerCase());
  const neededRoles = allowedRoles.map(role => role.toLowerCase());

  // Check access
  const hasAccess = userRoles.some(role => neededRoles.includes(role));

  if (!hasAccess) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
