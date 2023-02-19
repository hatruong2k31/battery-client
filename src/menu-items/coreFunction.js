// assets
import { ProfileOutlined } from "@ant-design/icons";

// icons
const icons = {
  ProfileOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const coreFunctions = {
  id: "Core",
  title: "Core",
  type: "group",
  children: [
    {
      id: "user",
      title: "User",
      type: "item",
      url: "/user/list",
      icon: icons.ProfileOutlined,
    },
    {
      id: "payment",
      title: "Payment",
      type: "item",
      url: "/payment/list",
      icon: icons.ProfileOutlined,
    },
    {
      id: "station",
      title: "Station",
      type: "item",
      url: "/station/list",
      icon: icons.ProfileOutlined,
    },
    {
      id: "battery",
      title: "Battery",
      type: "item",
      url: "/battery/list",
      icon: icons.ProfileOutlined,
    },
  ],
};

export default coreFunctions;
