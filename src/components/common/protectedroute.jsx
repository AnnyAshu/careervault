import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { hasRole } from "../../utils/roleHelper";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // User not logged in
  if (!user) return <Navigate to="/login" replace />;

  // If roles are specified and user doesn't match any
  if (roles && !hasRole(user, roles)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
