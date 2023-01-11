// third-party
import { createSlice } from "@reduxjs/toolkit";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  opportunitys: [],
  opportunity: null,
};

const slice = createSlice({
  name: "opportunity",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET opportunitys
    getOpportunitysSuccess(state, action) {
      state.opportunitys = action.payload;
    },

    // FILTER opportunitys
    filterOpportunitysSuccess(state, action) {
      state.opportunitys = action.payload;
    },

    // GET PRODUCT
    getOpportunitysuccess(state, action) {
      state.opportunity = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getOpportunitys() {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("api/opportunity/list", header);
      dispatch(slice.actions.getOpportunitysSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterOpportunitys(filter) {
  return async () => {
    try {
      const response = await axios.post("/api/opportunity/filter", { filter });
      dispatch(slice.actions.filterOpportunitysSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOpportunity(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/api/opportunity/detail/${id}`, header);
      dispatch(slice.actions.getOpportunitysuccess(response.data.data[0]));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
