import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

function ProtectedRoutes({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoutes;
