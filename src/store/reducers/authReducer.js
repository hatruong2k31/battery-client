// action - state management
import { LOGIN, LOGOUT } from "./actions";

// initial state
const initialState = {
  isLogin: localStorage?.getItem("isLogin") ? true : false,
  user: JSON.parse(localStorage?.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: JSON.parse(localStorage?.getItem("token"))
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};
// const initialState = {
//   isLogin: false,
//   user: null,
//   token: null,
// };

// ==============================|| AUTH REDUCER ||============================== //

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      const user = action.payload.data?.user;
      const token = action.payload.data?.jwt;
      console.log(token);
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLogin", true);
      return {
        ...state,
        isLogin: true,
        user,
        token,
      };
    }
    case LOGOUT: {
      localStorage.setItem("token", JSON.stringify(null));
      localStorage.setItem("user", JSON.stringify(null));
      localStorage.setItem("isLogin", false);
      return {
        ...state,
        isLogin: false,
        user: null,
        token: null,
      };
    }

    default: {
      throw new Error("invalid action");
    }
  }
};

export { initialState };
export default authReducer;
