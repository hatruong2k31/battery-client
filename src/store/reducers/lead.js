// third-party
import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  leads: [],
  lead: null,
  leadEdit: null,
  related: [],
  deleted: null,
};

const slice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET leads
    getLeadsSuccess(state, action) {
      state.leads = action.payload;
    },

    // FILTER leads
    filterLeadsSuccess(state, action) {
      state.leads = action.payload;
    },

    // GET PRODUCT
    getLeadSuccess(state, action) {
      state.lead = action.payload;
    },

    getLeadEditSuccess(state, action) {
      state.leadEdit = action.payload;
    },

    // GET RELATED leads
    getRelatedSuccess(state, action) {
      state.related = action.payload;
    },

    // GET DELETE result
    getDeleteResult(state, action) {
      state.deleted = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getLeads() {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const query = qs.stringify(
        {
          pagination: { isPage: false },
          filters: {
            is_delete: {
              $eq: false,
            },
          },
          sort: [{ column: "created_at", order: "desc" }],
        },
        {
          encodeValuesOnly: true,
        }
      );

      const response = await axios.get(`/api/lead/list?${query}`, header);

      dispatch(slice.actions.getLeadsSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterLeads(filter) {
  return async () => {
    try {
      const response = await axios.post("/api/leads/list", { filter });
      dispatch(slice.actions.filterLeadsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLead(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/lead/detail/${id}`, header);

      dispatch(slice.actions.getLeadSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLeadEdit(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/lead/detail/${id}`, header);
      dispatch(slice.actions.getLeadEditSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteLead(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/api/lead/${id}`, header);
      console.log(response);
      dispatch(slice.actions.getDeleteResult(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
