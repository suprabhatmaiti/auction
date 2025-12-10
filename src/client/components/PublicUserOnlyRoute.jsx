import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

export default function PublicUserOnlyRoute({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay loading={loading} />;
  }
  if (isLoggedIn) {
    if (isAdmin) return <Navigate to="/admin-home" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
