import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import { PrivateRoutes } from "./PrivateRouterWrapper";
import { UserProvider } from "../contexts/UserContext";
import { PaymentProvider } from "../contexts/PaymentContext";
// render - core
//User
const CreateUser = Loadable(
  lazy(() => import("../pages/core/user/CreateUser"))
);
const UserList = Loadable(lazy(() => import("../pages/core/user/UserList")));
const EditUser = Loadable(lazy(() => import("../pages/core/user/EditUser")));
const ViewUser = Loadable(lazy(() => import("../pages/core/user/ViewUser")));

// Payment
const PaymentList = Loadable(
  lazy(() => import("../pages/core/payment/PaymentList"))
);
const CreatePayment = Loadable(
  lazy(() => import("../pages/core/payment/CreatePayment"))
);
const EditPayment = Loadable(
  lazy(() => import("../pages/core/payment/EditPayment"))
);
const ViewPayment = Loadable(
  lazy(() => import("../pages/core/payment/ViewPayment"))
);

// Station
const StationList = Loadable(
  lazy(() => import("../pages/core/station/StationList"))
);
const CreateStation = Loadable(
  lazy(() => import("../pages/core/station/CreateStation"))
);
const EditStation = Loadable(
  lazy(() => import("../pages/core/station/EditStation"))
);
const ViewStation = Loadable(
  lazy(() => import("../pages/core/station/ViewStation"))
);

//Battery
// const BatteryList = Loadable(lazy(() => import("../pages/core/battery/List")));
// const CreateBattery = Loadable(
//   lazy(() => import("../pages/core/battery/Create"))
// );
// const EditBattery = Loadable(lazy(() => import("../pages/core/battery/Edit")));

// ==============================|| AUTH ROUTING ||============================== //

const CoreRoutes = {
  path: "/",
  element: (
    <PrivateRoutes>
      <MainLayout />
    </PrivateRoutes>
  ),
  children: [
    {
      path: "/user",
      children: [
        {
          path: "list",
          element: (
            <UserProvider>
              <UserList />
            </UserProvider>
          ),
        },
        {
          path: "create",
          element: <CreateUser />,
        },
        {
          path: "edit/:id",
          element: <EditUser />,
        },
        {
          path: "view/:id",
          element: <ViewUser />,
        },
      ],
    },
    {
      path: "/payment",
      children: [
        {
          path: "list",
          element: (
            <PaymentProvider>
              <PaymentList />
            </PaymentProvider>
          ),
        },
        {
          path: "create",
          element: <CreatePayment />,
        },
        {
          path: "edit/:id",
          element: <EditPayment />,
        },
        {
          path: "view/:id",
          element: <ViewPayment />,
        },
      ],
    },
    // {
    //   path: "/battery",
    //   children: [
    //     {
    //       path: "list",
    //       element: <BatteryList />,
    //     },
    //     {
    //       path: "create",
    //       element: <CreateBattery />,
    //     },
    //     {
    //       path: "edit/:id",
    //       element: <EditBattery />,
    //     },
    //   ],
    // },
    {
      path: "/station",
      children: [
        {
          path: "list",
          element: <StationList />,
        },
        {
          path: "create",
          element: <CreateStation />,
        },
        {
          path: "edit/:id",
          element: <EditStation />,
        },
        {
          path: "view/:id",
          element: <ViewStation />,
        },
      ],
    },
  ],
};

export default CoreRoutes;
