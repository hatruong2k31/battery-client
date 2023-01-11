// assets
import { LoginOutlined, ProfileOutlined } from "@ant-design/icons";

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const coreFunctions = {
  id: "Core",
  title: "Core",
  type: "group",
  children: [
    {
      id: "account",
      title: "Account",
      type: "item",
      url: "/account/list",
      icon: icons.LoginOutlined,
    },
    {
      id: "contact",
      title: "Contact",
      type: "item",
      url: "/contact/list",
      icon: icons.ProfileOutlined,
    },
    {
      id: "lead",
      title: "Lead",
      type: "item",
      url: "/lead/list",
      icon: icons.ProfileOutlined,
    },
    {
      id: "opportunity",
      title: "Opportunity",
      type: "item",
      url: "/opportunity/list",
      icon: icons.ProfileOutlined,
    },
    {
      id: "task",
      title: "Task",
      type: "item",
      url: "/task/list",
      icon: icons.ProfileOutlined,
    },
  ],
};

export default coreFunctions;
