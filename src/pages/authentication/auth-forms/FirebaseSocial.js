// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

//
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { FIREBASE_API } from "../../../config";

//project import
import { postLoginGG } from "../../../utils/request";
import useAuth from "../../../hooks/useAuth";
import { login } from "../../../store/reducers/actions";
// assets
import Google from "../../../assets/images/icons/google.svg";

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [authState, authDispatch] = useAuth();

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth(initializeApp(FIREBASE_API));

  const googleHandler = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const idToken = result?._tokenResponse?.idToken;
        const data = { token: idToken };
        postLoginGG(data)
          .then((response) => {
            if (response.status === 200) {
              return authDispatch(login(response)), navigate("/");
            } else {
              navigate("/login");
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
