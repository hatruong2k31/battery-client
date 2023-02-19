import { Link as RouterLink } from "react-router-dom";

// material-ui
import { Grid, Stack, Typography, Link } from "@mui/material";

// project import
import AuthFogotPWD from "./auth-forms/AuthForgotPWD";
import AuthWrapper from "./AuthWrapper";

// ================================|| REGISTER ||================================ //

const ForgotPWD = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          spacing={2}
        >
          <Link
            alignRight
            variant="h6"
            component={RouterLink}
            to="/login"
            color="primary"
          >
            Back to Login
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography variant="h4">Forgot password</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthFogotPWD />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default ForgotPWD;
