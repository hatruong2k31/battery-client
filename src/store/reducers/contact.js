// third-party
import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  contacts: [],
  contact: null,
  related: [],
  deleted: null,
};

const slice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET contacts
    getContactsSuccess(state, action) {
      state.contacts = action.payload;
    },

    // FILTER contacts
    filterContactsSuccess(state, action) {
      state.contacts = action.payload;
    },

    // GET PRODUCT
    getContactSuccess(state, action) {
      state.contact = action.payload;
    },

    // GET RELATED contacts
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

export function getContacts() {
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
          sort: [{ column: "updated_at", order: "desc" }],
        },
        {
          encodeValuesOnly: true,
        }
      );

      const response = await axios.get(`/api/contact/list?${query}`, header);

      dispatch(slice.actions.getContactsSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterContacts(filter) {
  return async () => {
    try {
      const response = await axios.post("/api/contact/list", { filter });
      dispatch(slice.actions.filterContactsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getContact(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/contact/detail/${id}`, header);

      dispatch(slice.actions.getContactSuccess(response.data));
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

export function deleteContact(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/api/contact/${id}`, header);
      dispatch(slice.actions.getDeleteResult(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
