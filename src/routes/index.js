import { useRoutes } from "react-router-dom";

// project import
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";
import CoreRoutes from "./CoreRoutes";
import SystemConfigRoutes from "./SystemConfigRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthRoutes, CoreRoutes, SystemConfigRoutes]);
}
