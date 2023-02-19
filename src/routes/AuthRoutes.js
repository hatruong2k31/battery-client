import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import Register from "../pages/authentication/Register";
import { AuthRoutes } from "./PrivateRouterWrapper";
// render - login
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
const GoogleAuthCallback = Loadable(
  lazy(() => import("../pages/authentication/auth-forms/GoogleAuthCallback"))
);
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
      path: "/register",
      element: <Register />,
    },
    {
      path: "/connect/google/redirect",
      element: <GoogleAuthCallback />,
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
