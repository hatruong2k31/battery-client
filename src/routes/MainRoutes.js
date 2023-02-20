import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import { PrivateRoutes } from "./PrivateRouterWrapper";
import Home from "../pages/core/home/index";
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("../pages/dashboard")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <PrivateRoutes>
      <MainLayout />
    </PrivateRoutes>
  ),
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
  ],
};

export default MainRoutes;
