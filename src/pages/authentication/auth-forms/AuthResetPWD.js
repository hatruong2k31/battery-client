import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
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
import AnimateButton from "../../../components/@extended/AnimateButton";
import {
  strengthColor,
  strengthIndicator,
} from "../../../utils/password-strength";
import useAuth from "../../../hooks/useAuth";
import { postResetPwd } from "../../../utils/request";
import { login } from "../../../store/reducers/actions";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { useDispatch } from "../../../store";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthResetPWD = () => {
  const [level1, setLevel1] = useState();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const changePassword1 = (value) => {
    const temp1 = strengthIndicator(value);
    setLevel1(strengthColor(temp1));
  };

  useEffect(() => {
    changePassword1("");
  }, []);

  const [codeParams, setCodeParams] = useSearchParams();
  const code = codeParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authState, authDispatch] = useAuth();
  return (
    <>
      <Formik
        initialValues={{
          code: code,
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required("Password is required"),
          passwordConfirmation: Yup.string()
            .max(255)
            .required("Confirm Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            postResetPwd(values)
              .then(function (response) {
                if (response.status === 200) {
                  //some logic
                  authDispatch(login(response));
                  return (
                    setSubmitting(true),
                    setStatus({ success: true }),
                    navigate("/"),
                    dispatch(
                      openSnackbar({
                        open: true,
                        message:
                          "Your password has been changed, you are logged in!",
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
                  <InputLabel htmlFor="password">New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password"
                    type={showPassword1 ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword1(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                          edge="end"
                          size="large"
                        >
                          {showPassword1 ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        sx={{
                          bgcolor: level1?.color,
                          width: 85,
                          height: 8,
                          borderRadius: "7px",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level1?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="passwordConfirmation">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(
                      touched.passwordConfirmation &&
                        errors.passwordConfirmation
                    )}
                    id="passwordConfirmation"
                    type={showPassword2 ? "text" : "password"}
                    value={values.passwordConfirmation}
                    name="passwordConfirmation"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                          edge="end"
                          size="large"
                        >
                          {showPassword2 ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.passwordConfirmation &&
                    errors.passwordConfirmation && (
                      <FormHelperText
                        error
                        id="helper-text-passwordConfirmation"
                      >
                        {errors.passwordConfirmation}
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
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthResetPWD;
