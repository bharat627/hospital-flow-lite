
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const isAuthenticated = localStorage.getItem("staffAuth") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default AuthGuard;
