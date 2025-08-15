import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "@/store";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  if (!allowedRoles.includes(user.role || "")) {
    const redirectPath = user.role === "designer" 
      ? "/dashboard/designer" 
      : "/dashboard/client";
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
