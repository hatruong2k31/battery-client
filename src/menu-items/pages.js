// assets
import { LoginOutlined, ProfileOutlined } from "@ant-design/icons";

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: "authentication",
  title: "Authentication",
  type: "group",
  children: [
    {
      id: "forgotpwd1",
      title: "Forgot Password",
      type: "item",
      url: "/forgotpwd",
      icon: icons.ProfileOutlined,
    },
  ],
};

export default pages;
