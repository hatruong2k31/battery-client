import { useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

// material-ui
import { Box, Tab, Tabs } from "@mui/material";

// project import
import MainCard from "../../components/MainCard";

// assets
import { SettingOutlined, TeamOutlined } from "@ant-design/icons";

// ==============================|| PROFILE - ACCOUNT ||============================== //

const SystemConfiguration = () => {
  const { pathname } = useLocation();
  let selectedTab = 0;
  switch (pathname) {
    case "/system-config/settings":
      selectedTab = 0;
      break;
    case "/system-config/users":
      selectedTab = 1;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard border={false} boxShadow>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="account profile tab"
        >
          <Tab
            label="Settings"
            component={Link}
            to="/system-config/settings"
            icon={<SettingOutlined />}
            iconPosition="start"
          />
          <Tab
            label="Users"
            component={Link}
            to="/system-config/users"
            icon={<TeamOutlined />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2.5 }}>
        <Outlet />
      </Box>
    </MainCard>
  );
};

export default SystemConfiguration;
