// third-party

import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  accountTypes: [],
  employees: [],
  industries: [],
  masterDatas: [],
  decisionTimeframes: [],
  productInterests: [],
  leadStatuss: [],
  leadSources: [],
  oppStages: [],
  oppTypes: [],
  oppLossReasons: [],
};

const slice = createSlice({
  name: "masterData",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    getAccountTypesSuccess(state, action) {
      state.accountTypes = action.payload;
    },

    getGendersSuccess(state, action) {
      state.genders = action.payload;
    },

    getEmployeesSuccess(state, action) {
      state.employees = action.payload;
    },

    getIndustriesSuccess(state, action) {
      state.industries = action.payload;
    },

    getDecisionTimeframesSuccess(state, action) {
      state.decisionTimeframes = action.payload;
    },

    getProductInterestsSuccess(state, action) {
      state.productInterests = action.payload;
    },

    getLeadSourcesSuccess(state, action) {
      state.leadSources = action.payload;
    },

    getLeadStatussSuccess(state, action) {
      state.leadStatuss = action.payload;
    },
    getOppStagesSuccess(state, action) {
      state.oppStages = action.payload;
    },
    getOppTypesSuccess(state, action) {
      state.oppTypes = action.payload;
    },
    getOppLossReasonsSuccess(state, action) {
      state.oppLossReasons = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getMasterDatas(parent_code) {
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
            parent_code: {
              $eq: parent_code,
            },
          },
          sort: [{ column: "id", order: "asc" }],
        },
        {
          encodeValuesOnly: true,
        }
      );
      const response = await axios.get(`/api/md/list?${query}`, header);

      switch (parent_code) {
        case "Acc_type":
          dispatch(
            slice.actions.getAccountTypesSuccess(response.data.data.data)
          );
          break;
        case "Employees":
          dispatch(slice.actions.getEmployeesSuccess(response.data.data.data));
          break;
        case "Industry":
          dispatch(slice.actions.getIndustriesSuccess(response.data.data.data));
          break;
        case "Gender":
          dispatch(slice.actions.getGendersSuccess(response.data.data.data));
          break;
        default:
          dispatch(
            slice.actions.getMasterDatasSuccess(response.data.data.data)
          );
          break;
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAccountTypes() {
  return async () => {
    try {
      const response = await masterDataService("Acc_type");
      dispatch(slice.actions.getAccountTypesSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getEmployees() {
  return async () => {
    try {
      const response = await masterDataService("Employees");

      dispatch(slice.actions.getEmployeesSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getGenders() {
  return async () => {
    try {
      const response = await masterDataService("Gender");

      dispatch(slice.actions.getGendersSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getIndustries() {
  return async () => {
    try {
      const response = await masterDataService("Industry");

      dispatch(slice.actions.getIndustriesSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDecisionTimeframes() {
  return async () => {
    try {
      const response = await masterDataService("Decision_Timeframe");

      dispatch(
        slice.actions.getDecisionTimeframesSuccess(response.data.data.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductInterests() {
  return async () => {
    try {
      const response = await masterDataService("Product_Interest");

      dispatch(
        slice.actions.getProductInterestsSuccess(response.data.data.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLeadStatuss() {
  return async () => {
    try {
      const response = await masterDataService("Lead_Status");

      dispatch(slice.actions.getLeadStatussSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLeadSources() {
  return async () => {
    try {
      const response = await masterDataService("Lead_Source");

      dispatch(slice.actions.getLeadSourcesSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOppStages() {
  return async () => {
    try {
      const response = await masterDataService("Opp_Stage");
      dispatch(slice.actions.getOppStagesSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOppTypes() {
  return async () => {
    try {
      const response = await masterDataService("Opp_type");
      dispatch(slice.actions.getOppTypesSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOppLossReasons() {
  return async () => {
    try {
      const response = await masterDataService("Opp_Lost_Reason");
      dispatch(slice.actions.getOppLossReasonsSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

const masterDataService = async (parent_code) => {
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
          parent_code: {
            $eq: parent_code,
          },
        },
        sort: [{ column: "id", order: "asc" }],
      },
      {
        encodeValuesOnly: true,
      }
    );

    return await axios.get(`/api/md/list?${query}`, header);
  } catch (error) {
    return error;
  }
};
