// material-ui
import {
  useMediaQuery,
  Container,
  Link,
  Typography,
  Stack,
} from "@mui/material";

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? "column" : "row"}
        justifyContent={matchDownSM ? "center" : "space-between"}
        spacing={2}
        textAlign={matchDownSM ? "center" : "inherit"}
      >
        <Typography
          variant="subtitle2"
          color="secondary"
          component="span"
        ></Typography>

        <Typography variant="subtitle2" color="secondary" component="span">
          &copy; Client Make By &nbsp;
          <Typography
            component={Link}
            variant="subtitle2"
            href="https://www.facebook.com/hq.truong010200"
            target="_blank"
            underline="hover"
          >
            HQ Truong
          </Typography>
        </Typography>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
