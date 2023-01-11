import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";

// render - core
const SytemConfiguration = Loadable(
  lazy(() => import("../pages/system-config/SytemConfiguration"))
);
const SystemUsersTab = Loadable(
  lazy(() => import("../pages/system-config/system-tabs/users"))
);
const SystemSettingTab = Loadable(
  lazy(() => import("../pages/system-config/system-tabs/settings"))
);



//User
const AddNewUser = Loadable(
  lazy(() => import("../pages/system-config/system-tabs/AddUser"))
);
const ViewUser = Loadable(
  lazy(() => import("../pages/system-config/system-tabs/ViewUser"))
);
const EditUser = Loadable(
  lazy(() => import("../pages/system-config/system-tabs/EditUser"))
);
// ==============================|| AUTH ROUTING ||============================== //

const SystemConfigRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "system-config",
      children: [
        {
          path: "",
          element: <SytemConfiguration />,
          children: [
            {
              path: "settings",
              element: <SystemSettingTab />,
            },
            {
              path: "users",
              element: <SystemUsersTab />,
              children: [
                
              ]
            },
            {
              path: "users-view/:id",
              element: <ViewUser />,
            },
            {
              path: "users-add-new",
              element: <AddNewUser />,
            },
            
            {
              path: "users-edit/:id",
              element: <EditUser />,
            },
          ],
        },
      ],
    },
  ],
};

export default SystemConfigRoutes;
