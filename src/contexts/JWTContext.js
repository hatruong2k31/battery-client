// import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
// import { postLogin } from "../utils/request";

// third-party
// import { Chance } from "chance";
// import jwtDecode from "jwt-decode";

// reducer - state management
import authReducer, { initialState } from "../store/reducers/authReducer";

// project import
// import Loader from "../components/Loader";
// import axios from "../utils/axios";

// const chance = new Chance();

// const verifyToken = (serviceToken) => {
//   if (!serviceToken) {
//     return false;
//   }
//   const decoded = jwtDecode(serviceToken);
//   /**
//    * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
//    */
//   return decoded.exp > Date.now() / 1000;
// };

// const setSession = (serviceToken) => {
//   if (serviceToken) {
//     localStorage.setItem("serviceToken", serviceToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
//   } else {
//     localStorage.removeItem("serviceToken");
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext();

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const serviceToken = window.localStorage.getItem("serviceToken");
  //       if (serviceToken && verifyToken(serviceToken)) {
  //         setSession(serviceToken);
  //         const response = await axios.get(`/api/auth/local`);
  //         const user = response.user;
  //         dispatch({
  //           type: LOGIN,
  //           payload: {
  //             isLoggedIn: true,
  //             user,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: LOGOUT,
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       dispatch({
  //         type: LOGOUT,
  //       });
  //     }
  //   };

  //   init();
  // }, []);

  // const login = async (email, password) => {
  //   console.log("login");
  //   const response = await axios.post("/api/auth/local", {
  //     email,
  //     password,
  //   });
  //   const user = response.user;
  //   const serviceToken = response.jwt;
  //   setSession(serviceToken);
  //   dispatch({
  //     type: LOGIN,
  //     payload: {
  //       isLoggedIn: true,
  //       user,
  //     },
  //   });
  // };

  // const register = async (email, password, firstName, lastName) => {
  //   // todo: this flow need to be recode as it not verified
  //   const id = chance.bb_pin();
  //   const response = await axios.post("/api/account/register", {
  //     id,
  //     email,
  //     password,
  //     firstName,
  //     lastName,
  //   });
  //   let users = response.data;

  //   if (
  //     window.localStorage.getItem("users") !== undefined &&
  //     window.localStorage.getItem("users") !== null
  //   ) {
  //     const localUsers = window.localStorage.getItem("users");
  //     users = [
  //       ...JSON.parse(localUsers),
  //       {
  //         id,
  //         email,
  //         password,
  //         name: `${firstName} ${lastName}`,
  //       },
  //     ];
  //   }

  //   window.localStorage.setItem("users", JSON.stringify(users));
  // };

  // const logout = () => {
  //   setSession(null);
  //   dispatch({ type: LOGOUT });
  // };

  // const resetPassword = async () => {};

  // const updateProfile = () => {};

  // if (state.isInitialized !== undefined && !state.isInitialized) {
  //   return <Loader />;
  // }

  return (
    <JWTContext.Provider
      value={
        [state, dispatch]

        // login,
        // logout,
        // register,
        // resetPassword,
        // updateProfile,
      }
    >
      {children}
    </JWTContext.Provider>
  );
};

// JWTProvider.propTypes = {
//   children: PropTypes.node,
// };

export default JWTContext;
