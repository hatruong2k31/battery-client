import { Navigate, useNavigate } from "react-router-dom";
import { postVerifyToken } from "../utils/request";
import { useDispatch } from "../store";
import { openSnackbar } from "../store/reducers/snackbar";

const PrivateRoutes = ({ children }) => {
  const token = JSON.parse(localStorage?.getItem("token"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  postVerifyToken({ token: token }).then((res) => {
    if (res?.status === 400) {
      return (
        localStorage.setItem("isLogin", false),
        navigate("/login"),
        dispatch(
          openSnackbar({
            open: true,
            message: "Vui Lòng Đăng Nhập!",
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
          })
        )
      );
    }
  });

  const isLogin = JSON.parse(localStorage?.getItem("isLogin"));
  return isLogin ? children : <Navigate to="/login" />;
};

const AuthRoutes = ({ children }) => {
  const dispatch = useDispatch();

  const isLogin = JSON.parse(localStorage?.getItem("isLogin"));
  if (isLogin) {
    dispatch(
      openSnackbar({
        open: true,
        message: "You are Logged",
        variant: "alert",
        alert: {
          color: "success",
        },
        close: false,
      })
    );
  }
  return isLogin ? <Navigate to="/" /> : children;
};

export { AuthRoutes, PrivateRoutes };
