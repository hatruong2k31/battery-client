import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getSignInGG } from "../../../utils/request";

//project import
import { useDispatch } from "../../../store";
import useAuth from "../../../hooks/useAuth";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { login } from "../../../store/reducers/actions";
const GoogleAuthCallback = () => {
  const [codeParams] = useSearchParams();
  const access_token = codeParams.get("access_token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authState, authDispatch] = useAuth();

  getSignInGG(access_token)
    .then((response) => {
      if (response.status === 200) {
        return (
          authDispatch(login(response)),
          navigate("/"),
          dispatch(
            openSnackbar({
              open: true,
              message: "Logged in successfully",
              variant: "alert",
              alert: {
                color: "success",
              },
              close: false,
            })
          ),
          console.log(response.status)
        );
      } else {
        dispatch(
          navigate("/login"),
          openSnackbar({
            open: true,
            message: "Error!",
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
          })
        );
      }
    })
    .catch((error) => {
      throw error;
    });
  return;
};

export default GoogleAuthCallback;
