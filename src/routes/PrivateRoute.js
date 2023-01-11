import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isLogin = JSON.parse(localStorage?.getItem("isLogin"));

  return isLogin ? children : <Navigate to="/login" />;
};

const AuthRoutes = ({ children }) => {
  const isLogin = JSON.parse(localStorage?.getItem("isLogin"));

  return isLogin ? <Navigate to="/" /> : children;
};

export { AuthRoutes, PrivateRoutes };
