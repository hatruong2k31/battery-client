// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

//
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { FIREBASE_API } from "../../../config";

//project import
import { get } from "../../../utils/request";
import useAuth from "../../../hooks/useAuth";
import { login } from "../../../store/reducers/actions";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { useDispatch } from "../../../store";
import { SERVER } from "../../../config";
// assets
import Google from "../../../assets/images/icons/google.svg";
import { Link } from "react-router-dom";

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const GoogleProvider = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authState, authDispatch] = useAuth();

  const googleHandler = async () => {
    await window.open(`${SERVER.localhost}/api/connect/google`);
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
        href={`${SERVER.localhost}/api/connect/google`}
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        // onClick={googleHandler}
      >
        {!matchDownSM && "Google"}
      </Button>
    </Stack>
  );
};

export default GoogleProvider;
