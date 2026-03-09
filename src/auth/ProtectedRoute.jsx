import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute() {
  const { isAuthenticated, booting } = useAuth();

  if (booting) {
    return null; // NEVER redirect while bootstrapping
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

