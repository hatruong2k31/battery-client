// third-party
import { createSlice } from "@reduxjs/toolkit";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  sys_configs: [],
  sys_config: null,
};

const slice = createSlice({
  name: "sys_config",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET System Config
    getSystemConfigsSuccess(state, action) {
      state.sys_configs = action.payload;
    },

    // GET System Config
    getSystemConfigSuccess(state, action) {
      state.sys_config = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getSystemConfigs() {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/api/system_parameter/list", header);
      dispatch(slice.actions.getSystemConfigsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSystemConfig(id) {
  return async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `/api/system_parameter/detail/${id}`,
        header
      );

      dispatch(slice.actions.getSystemConfigSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
