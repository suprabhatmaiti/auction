import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

function ProtectedRoutes({ children }) {
  const { isAdmin, isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay loading={loading} />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoutes;
