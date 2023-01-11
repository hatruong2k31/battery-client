import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import { AuthRoutes } from "./PrivateRoute";
// render - login
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
const ForgotPWD = Loadable(
  lazy(() => import("../pages/authentication/ForgotPWD"))
);
const ResetPWD = Loadable(
  lazy(() => import("../pages/authentication/ResetPWD"))
);
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,

  children: [
    {
      path: "/login",
      element: (
        <AuthRoutes>
          <Login />
        </AuthRoutes>
      ),
    },
    {
      path: "/forgotpwd",
      element: <ForgotPWD />,
    },
    {
      path: "/resetpwd",
      element: <ResetPWD />,
    },
  ],
};

export default LoginRoutes;
