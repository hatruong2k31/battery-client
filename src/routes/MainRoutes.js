import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import { PrivateRoutes } from "./PrivateRouterWrapper";
const Home = Loadable(lazy(() => import("../pages/core/home/index")));

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("../pages/dashboard")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      children: [
        {
          path: "default",
          element: (
            <PrivateRoutes>
              <DashboardDefault />
            </PrivateRoutes>
          ),
        },
      ],
    },
  ],
};

export default MainRoutes;
