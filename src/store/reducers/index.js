// third-party
import { combineReducers } from "redux";

// project import

import menu from "./menu";
import account from "./account";
import productReducer from "./product";
import user from "./user";
import snackbar from "./snackbar";
import sys_config from "./sysConfig";
import masterData from "./masterData";
import opportunity from "./opportunity";
import lead from "./lead";
import task from './task';
import role from "./role";
import contact from "./contact";
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  product: productReducer,
  account,
  contact,
  user,
  sys_config,
  snackbar,
  masterData,
  opportunity,
  lead,
  role,
  task,
});

export default reducers;
