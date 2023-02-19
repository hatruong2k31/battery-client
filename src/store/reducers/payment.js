// third-party
import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  payments: [],
  payment: null,
  deleted: null,
};

const slice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET payments
    getPaymentsSuccess(state, action) {
      state.payments = action.payload;
    },

    // FILTER payments
    filterPaymentsSuccess(state, action) {
      state.payments = action.payload;
    },

    // GET PRODUCT
    getPaymentSuccess(state, action) {
      state.payment = action.payload;
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

export function getPayments() {
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

      const response = await axios.get(`/api/payment/list?${query}`, header);

      dispatch(slice.actions.getPaymentsSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterPayments(filter) {
  return async () => {
    try {
      const response = await axios.post("/api/payment/list", { filter });
      dispatch(slice.actions.filterPaymentsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPayment(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/payment/detail/${id}`, header);

      dispatch(slice.actions.getPaymentSuccess(response.data.data[0]));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deletePayment(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/api/payment/${id}`, header);
      dispatch(slice.actions.getDeleteResult(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
