import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import { PrivateRoutes } from "./PrivateRoute";

// render - core
//User
const EditUser = Loadable(lazy(() => import("../pages/core/user/EditUser")));
//Opportunity
const OpportunityList = Loadable(
  lazy(() => import("../pages/core/opportunity/List"))
);
const AddNewOpportunity = Loadable(
  lazy(() => import("../pages/core/opportunity/Add"))
);
const ViewOpportunity = Loadable(
  lazy(() => import("../pages/core/opportunity/View"))
);
const EditOpportunity = Loadable(
  lazy(() => import("../pages/core/opportunity/Edit"))
);

//Account
const AccountList = Loadable(
  lazy(() => import("../pages/core/account/AccountList"))
);
const AddNewAccount = Loadable(
  lazy(() => import("../pages/core/account/AddAccount"))
);
const ViewAccount = Loadable(
  lazy(() => import("../pages/core/account/ViewAccount"))
);
const EditAccount = Loadable(
  lazy(() => import("../pages/core/account/EditAccount"))
);

//Contact
const ContactList = Loadable(
  lazy(() => import("../pages/core/contact/ContactList"))
);
const CreateContact = Loadable(
  lazy(() => import("../pages/core/contact/CreateContact"))
);
const ViewContact = Loadable(
  lazy(() => import("../pages/core/contact/ViewContact"))
);
const EditContact = Loadable(
  lazy(() => import("../pages/core/contact/EditContact"))
);

//Lead
const LeadList = Loadable(lazy(() => import("../pages/core/lead/LeadList")));
const AddNewLead = Loadable(lazy(() => import("../pages/core/lead/AddLead")));
const ViewLead = Loadable(lazy(() => import("../pages/core/lead/ViewLead")));
const EditLead = Loadable(lazy(() => import("../pages/core/lead/EditLead")));

const ListTask = Loadable(lazy(() => import("../pages/core/task/Task")));
const AddTask = Loadable(lazy(()=>import("../pages/core/task/AddTask")))
const EditTask = Loadable(lazy(()=>import("../pages/core/task/EditTask")))
const ViewTask = Loadable(lazy(()=>import("../pages/core/task/ViewTask")))

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
          path: "edit/:id",
          element: <EditUser />,
        },
      ],
    },
    {
      path: "/account",
      children: [
        {
          path: "list",
          element: <AccountList />,
        },
        {
          path: "add-new-account",
          element: <AddNewAccount />,
        },
        {
          path: "view/:id",
          element: <ViewAccount />,
        },
        {
          path: "edit/:id",
          element: <EditAccount />,
        },
      ],
    },
    {
      path: "/contact",
      children: [
        {
          path: "list",
          element: <ContactList />,
        },
        {
          path: "create",
          element: <CreateContact />,
        },
        {
          path: "view/:id",
          element: <ViewContact />,
        },
        {
          path: "edit/:id",
          element: <EditContact />,
        },
      ],
    },
    {
      path: "/lead",
      children: [
        {
          path: "list",
          element: <LeadList />,
        },
        {
          path: "add-new-lead",
          element: <AddNewLead />,
        },
        {
          path: "view/:id",
          element: <ViewLead />,
        },
        {
          path: "edit/:id",
          element: <EditLead />,
        },
      ],
    },
    {
      path: "/task",
      children:[
        {
          path: "list",
          element:<ListTask />
        },
        {
          path: "add",
          element:<AddTask />
        },
        {
          path: "edit/:id",
          element:<EditTask />
        },
        {
          path: "view/:id",
          element:<ViewTask />
        },
      ],
    },
    {
      path: "/opportunity",
      children: [
        {
          path: "list",
          element: <OpportunityList />,
        },
        {
          path: "add",
          element: <AddNewOpportunity />,
        },
        {
          path: "view/:id",
          element: <ViewOpportunity />,
        },
        {
          path: "edit/:id",
          element: <EditOpportunity />,
        },
      ],
    },
  ],
};

export default CoreRoutes;
