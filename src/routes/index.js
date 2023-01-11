import { useRoutes } from "react-router-dom";

// project import
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";
import CoreRoutes from "./CoreRoutes";
import SystemConfigRoutes from "./SystemConfigRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, LoginRoutes, CoreRoutes, SystemConfigRoutes]);
}
