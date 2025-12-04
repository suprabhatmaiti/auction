import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";

export default function AdminRoute({ children }) {
  const { isLoggedIn, loading, isAdmin } = useAuth();

  if (loading) {
    return <LoadingOverlay loading={loading} />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
