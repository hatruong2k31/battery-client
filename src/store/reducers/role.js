// third-party
import { createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils/request";
// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  roles: [],
  role: null,
};

const slice = createSlice({
  name: "role",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET roles
    getRolesSuccess(state, action) {
      state.roles = action.payload;
    },

    // FILTER roles
    filterRolesSuccess(state, action) {
      state.roles = action.payload;
    },

    // GET PRODUCT
    getRolesuccess(state, action) {
      state.role = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRoles() {
  return async () => {
    try {
      const response = await get("/api/users-permissions/roles");
      dispatch(slice.actions.getRolesSuccess(response.data.roles));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterRoles(filter) {
  return async () => {
    try {
      const response = await axios.post("/api/users-permissions/roles", {
        filter,
      });
      dispatch(slice.actions.filterRolesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRole(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `/api/users-permissions/roles/${id}`,
        header
      );
      dispatch(slice.actions.getRolesuccess(response.data.data[0]));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
