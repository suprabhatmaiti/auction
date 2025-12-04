import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

export default function PublicUserOnlyRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    console.log("loading");
    return <LoadingOverlay loading={loading} />;
  }
  if (isAdmin) return <Navigate to="/admin-home" replace />;

  return children;
}
