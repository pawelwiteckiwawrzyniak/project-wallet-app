import { useAuth } from "../../hooks/userAuth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

//if user is logged in go show OUTLET. if user isn't logged in go to login route
