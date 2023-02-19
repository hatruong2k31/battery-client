// assets
import { SettingOutlined } from "@ant-design/icons";

// icons
const icons = {
  SettingOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const systemConfig = {
  id: "config",
  title: "Config",
  type: "group",
  children: [
    {
      id: "system",
      title: "System",
      type: "item",
      url: "/system-config/settings",
      icon: icons.SettingOutlined,
    },
  ],
};

export default systemConfig;
