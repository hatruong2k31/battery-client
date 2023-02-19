// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

//firebase
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { FIREBASE_API } from "../../../config";

//project import
import { postLoginGG } from "../../../utils/request";
import useAuth from "../../../hooks/useAuth";
import { login } from "../../../store/reducers/actions";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { useDispatch } from "../../../store";

// assets
import Google from "../../../assets/images/icons/google.svg";

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authState, authDispatch] = useAuth();

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth(initializeApp(FIREBASE_API));

  const googleHandler = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const idToken = result?._tokenResponse?.idToken;
        const data = { id_token: idToken };
        postLoginGG(data)
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
                )
              );
            } else {
              navigate("/login");
              dispatch(
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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        dispatch(
          openSnackbar({
            open: true,
            message: errorMessage,
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
          })
        );
        console.log({
          errorCode: errorCode,
          errorMessage: errorMessage,
          email: email,
          credential: credential,
        });
      });
  };
  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? "space-around" : "space-between"}
      sx={{
        "& .MuiButton-startIcon": {
          mr: matchDownSM ? 0 : 1,
          ml: matchDownSM ? 0 : -0.5,
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleHandler}
      >
        {!matchDownSM && "Google"}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
