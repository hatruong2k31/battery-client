// third-party
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  accounts: [],
  account: null,
  accountEdit: null,
  related: [],
  deleted: null,
};

const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET accounts
    getAccountsSuccess(state, action) {
      state.accounts = action.payload;
    },

    // FILTER accounts
    filterAccountsSuccess(state, action) {
      state.accounts = action.payload;
    },

    // GET PRODUCT
    getAccountSuccess(state, action) {
      state.account = action.payload;
    },

    getAccountEditSuccess(state, action) {
      state.accountEdit = action.payload;
    },

    // GET RELATED accounts
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

export function getAccounts() {
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

      const response = await axios.get(`/api/account/list?${query}`, header);

      dispatch(slice.actions.getAccountsSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterAccounts(filter) {
  return async () => {
    try {
      const response = await axios.post("/api/accounts/list", { filter });
      dispatch(slice.actions.filterAccountsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAccount(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/account/detail/${id}`, header);
      dispatch(slice.actions.getAccountSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAccountEdit(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/account/detail/${id}`, header);
      dispatch(slice.actions.getAccountEditSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteAccount(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/api/account/${id}`, header);
      console.log(response);
      dispatch(slice.actions.getDeleteResult(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
