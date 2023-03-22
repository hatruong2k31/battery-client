// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import user from "./user";
import snackbar from "./snackbar";
import sys_config from "./sysConfig";
import payment from "./payment";
import role from "./role";
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  user,
  menu,
  payment,
  sys_config,
  snackbar,
  role,
});

export default reducers;
