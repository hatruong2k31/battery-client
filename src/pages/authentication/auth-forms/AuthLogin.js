import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
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
import { postLogin } from "../../../utils/request";
import useAuth from "../../../hooks/useAuth";
import { login } from "../../../store/reducers/actions";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const navigate = useNavigate();

  const [authState, authDispatch] = useAuth();

  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  localStorage.setItem("isLogin", false);

  return (
    <>
      <Formik
        initialValues={{
          identifier: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          identifier: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string()
            .min(1)
            .max(255)
            .required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            postLogin(values)
              .then(function (response) {
                // response.data.jwt = token;
                // response.data.user = user;
                //..........status = 200
                if (response.status === 200) {
                  authDispatch(login(response));
                  return (
                    setSubmitting(true),
                    setStatus({ success: true }),
                    navigate("/")
                  );
                } else {
                  return (
                    setSubmitting(false),
                    setStatus({ success: false }),
                    setErrors({ submit: response.error.message })
                  );
                }
              })
              .catch(function (error) {
                return (
                  setSubmitting(false),
                  setStatus({ success: false }),
                  setErrors({ submit: error.response?.data?.message })
                );
              });
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
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
                  <InputLabel htmlFor="identifier">Email Address</InputLabel>
                  <OutlinedInput
                    id="identifier"
                    type="email"
                    value={values.identifier}
                    name="identifier"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    fullWidth
                    error={Boolean(touched.identifier && errors.identifier)}
                  />
                  {touched.identifier && errors.identifier && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-identifier"
                    >
                      {errors.identifier}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Link
                    alignRight
                    variant="h6"
                    component={RouterLink}
                    to="/forgotpwd"
                    color="text.primary"
                  >
                    Forgot Password?
                  </Link>
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
                    href=""
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <FirebaseSocial />
    </>
  );
};

export default AuthLogin;
