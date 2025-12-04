import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

function ProtectedRoutes({ children }) {
  const { isAdmin, isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  if (isAdmin) {
    return <Navigate to="/admin-home" replace />;
  }

  return children;
}

export default ProtectedRoutes;
