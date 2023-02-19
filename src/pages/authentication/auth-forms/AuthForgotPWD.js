// material-ui
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import FirebaseSocial from "./FirebaseSocial";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { postFogotPwd } from "../../../utils/request";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { useDispatch } from "../../../store";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthFogotPWD = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            postFogotPwd(values)
              .then(function (response) {
                if (response.status === 200) {
                  //some logic
                  return (
                    setStatus({ success: true }),
                    setSubmitting(true),
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: "Check your inbox for the next step!",
                        variant: "alert",
                        alert: {
                          color: "success",
                        },
                        close: false,
                      })
                    )
                  );
                } else {
                  return (
                    setSubmitting(false),
                    setStatus({ success: false }),
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: "Invalid email!",
                        variant: "alert",
                        alert: {
                          color: "error",
                        },
                        close: false,
                      })
                    )
                  );
                }
              })
              .catch(function (error) {
                return (
                  setSubmitting(false),
                  setStatus({ success: false }),
                  setErrors({ submit: error.response.data?.error })
                );
              });
          } catch (err) {
            return (
              setStatus({ success: false }),
              setErrors({ submit: err.message }),
              setSubmitting(false)
            );
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">
                    Enter Your Email Address *
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Confirm
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }}>
                  <Typography variant="caption">Or login with</Typography>
                </Divider>
                <FirebaseSocial />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthFogotPWD;
