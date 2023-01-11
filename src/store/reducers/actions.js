// action and const - user reducer
export const LOGIN = "@auth/LOGIN";
export const LOGOUT = "@auth/LOGOUT";

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const logout = (payload) => ({
  type: LOGOUT,
  payload,
});
