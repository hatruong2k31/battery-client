// third-party
import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";

// project imports
import axios from "../../utils/axios";
import { dispatch } from "../index";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  tasks: [],
  task: null,
  taskEdit: null,
  related: [],
  deleted: null,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET tasks
    getTasksSuccess(state, action) {
      state.tasks = action.payload;
    },

    // FILTER tasks
    filterTasksSuccess(state, action) {
      state.tasks = action.payload;
    },

    // GET PRODUCT
    getTaskSuccess(state, action) {
      state.task = action.payload;
    },

    getTaskEditSuccess(state, action) {
      state.taskEdit = action.payload;
    },

    // GET RELATED tasks
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

export function getTasks() {
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

      const response = await axios.get(`/api/task/list?${query}`, header);
        console.log(response);
      dispatch(slice.actions.getTasksSuccess(response.data.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterTask(filter) {
  return async () => {
    try {
      const response = await axios.post("/api/task/list", { filter });
      dispatch(slice.actions.filterTasksSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDetailTask(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/task/detail/${id}`, header);

      dispatch(slice.actions.getTaskSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTaskEdit(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/api/task/detail/${id}`, header);
      dispatch(slice.actions.getTaskEditSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTask(id) {
  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/api/task/${id}`, header);
      console.log(response);
      dispatch(slice.actions.getDeleteResult(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
