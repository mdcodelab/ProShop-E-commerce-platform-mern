import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo.isAdmin ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
}

export default AdminRoute;
