import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  return allowedRoles.includes(auth.role) ? (
    <Outlet />
  ) : (
    <Navigate to={PATH_NAME.LOGIN} />
  );
};

export default RequireAuth;
