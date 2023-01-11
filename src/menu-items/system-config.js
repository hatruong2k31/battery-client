// assets
import { LoginOutlined, ProfileOutlined } from "@ant-design/icons";

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const systemConfig = {
  id: "System",
  title: "System",
  type: "group",
  children: [
    {
      id: "system_config",
      title: "Config",
      type: "item",
      url: "/system-config/settings",
      icon: icons.LoginOutlined,
    },
  ],
};

export default systemConfig;
