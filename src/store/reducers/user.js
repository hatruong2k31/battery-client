// third-party
import { createSlice } from "@reduxjs/toolkit";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  users: [],
  user: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET users
    getUsersSuccess(state, action) {
      state.users = action.payload;
    },

    // FILTER users
    filterUsersSuccess(state, action) {
      state.users = action.payload;
    },

    // GET PRODUCT
    getUsersuccess(state, action) {
      state.user = action.payload;
    },

    // GET RELATED users
    getRelatedSuccess(state, action) {
      state.related = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers() {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/api/users", header);
      // console.log(response.data);
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterUsers(filter) {
  return async () => {
    try {
      const response = await axios.post("/api/users/filter", { filter });
      dispatch(slice.actions.filterUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUser(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/api/guser/detail/${id}`, header);
      dispatch(slice.actions.getUsersuccess(response.data.data[0]));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelated(id) {
  return async () => {
    try {
      const response = await axios.post("/api/product/related", { id });
      dispatch(slice.actions.getRelatedSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
