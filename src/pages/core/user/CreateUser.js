import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// material-ui
import {
  Grid,
  Stack,
  Button,
  OutlinedInput,
  InputLabel,
  TextField,
  Typography,
  FormHelperText,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// project import
import * as Yup from "yup";
import { Formik } from "formik";
import MainCard from "../../../components/MainCard";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { get, post } from "../../../utils/request";
import { openSnackbar } from "../../../store/reducers/snackbar";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "../../../store";
import { getRoles } from "../../../store/reducers/role";
import { roleSelect } from "../../../utils/selectRequest";
// assets

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function CreateUser() {
  const history = useNavigate();
  const dispatch = useDispatch();
  // const [roles, setRoles] = useState([]);
  const { roles } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRoles());
    // roleSelect().then((response) => {
    //   return setRoles(response.data);
    // });
  }, [dispatch]);

  const handleCancel = () => {
    history(`/user/list`);
  };

  return (
    <>
      <Formik
        initialValues={{
          role_id: "",
          username: "",
          identity_card: "",
          email: "",
          phone: "",
          card_id: "",
          balance: 0,
          password: "",
          provider: "local",
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          username: Yup.string()
            .matches(
              "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$[0-9]?",
              "Please enter a valid Username!"
            )
            .max(70, "No more than 70 characters")
            .required("Username is required"),
          phone: Yup.string()
            .matches("^0[0-9]{9,10}$", "Please enter a valid Phone")
            .min(10, "Please enter a valid Phone")
            .max(11, "Please enter a valid Phone")
            .nullable(),
          identity_card: Yup.string()
            .matches("^[0-9]*$", "Please enter a valid Identity Card")
            .min(9, "Please enter a valid Identtity Card")
            .max(12, "No more than 12 characters")
            .nullable(),
          balance: Yup.number()
            .min(0, "Must not be less than 0!")
            .max(100000000, "No more than 1 billion VND!")
            .nullable(),
          password: Yup.string().required("Password is required"),
          role_id: Yup.string()
            .required("Role is required")
            .nullable("Role is required"),
          card_id: Yup.string().required("RFID is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            values.username = values.username.trim();
            await post(`api/user/`, values).then(function (response) {
              if (response.status === 200) {
                return (
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: `User ${values.username} was created`,
                      variant: "alert",
                      alert: {
                        color: "success",
                      },
                      close: false,
                    })
                  ),
                  setSubmitting(true),
                  setStatus({ success: true }),
                  history(`/user/list`),
                  console.log(response.data)
                  // history(`/user/view/${response.data.data.id}`)
                );
              } else {
                return (
                  setSubmitting(false),
                  setStatus({ success: false }),
                  setErrors({ submit: response?.details }),
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: response?.details,
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
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            dispatch(
              openSnackbar({
                open: true,
                message: err.message,
                variant: "alert",
                alert: {
                  color: "error",
                },
                close: false,
              })
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
          setFieldValue,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard title="Create User">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                  <InputLabel sx={{ mb: 1 }}>
                    Role{" "}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ color: `error.main` }}
                    >
                      *
                    </Typography>
                  </InputLabel>
                  <Select
                    sx={{
                      "& .MuiSelect-iconOutlined": {
                        display: values.role_id ? "none" : "",
                      },
                    }}
                    name="role_id"
                    id="role_id"
                    placeholder="Select Role"
                    fullWidth
                    value={values?.role_id || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    endAdornment={
                      <IconButton
                        sx={{
                          visibility: values.role_id ? "visible" : "hidden",
                        }}
                        onClick={() => {
                          setFieldValue("role_id", null);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    }
                    error={Boolean(touched.role_id && errors.role_id)}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                    <MenuItem key="" value={""}></MenuItem>
                  </Select>
                  {touched.role_id && errors.role_id && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-role_id"
                    >
                      {errors.role_id}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputLabel sx={{ mb: 1 }}>Provider</InputLabel>
                  <OutlinedInput
                    sx={{ fontWeight: 750, fontSize: 15 }}
                    id="provider"
                    type="text"
                    value={values.provider}
                    name="provider"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    readOnly
                    error={Boolean(touched.provider && errors.provider)}
                  />
                  {touched.provider && errors.provider && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-provider"
                    >
                      {errors.provider}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1 }}>
                    Email{" "}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ color: `error.main` }}
                    >
                      *
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1 }}>
                    Password{" "}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ color: `error.main` }}
                    >
                      *
                    </Typography>
                  </InputLabel>
                  <TextField
                    type="password"
                    sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                    placeholder="Enter password"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    id="password"
                    error={Boolean(touched.password && errors.password)}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1 }}>
                    Username{" "}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ color: `error.main` }}
                    >
                      *
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    id="username"
                    type="text"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-username"
                    >
                      {errors.username}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                  <OutlinedInput
                    id="phone"
                    type="text"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-phone"
                    >
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1 }}>Identity Card</InputLabel>
                  <OutlinedInput
                    id="identity_card"
                    type="text"
                    name="identity_card"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Identity"
                    fullWidth
                    error={Boolean(
                      touched.identity_card && errors.identity_card
                    )}
                  />
                  {touched.identity_card && errors.identity_card && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-identity_card"
                    >
                      {errors.identity_card}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputLabel sx={{ mb: 1 }}>
                    RFID{" "}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ color: `error.main` }}
                    >
                      *
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    id="card_id"
                    type="text"
                    name="card_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter RFID"
                    fullWidth
                    error={Boolean(touched.card_id && errors.card_id)}
                  />
                  {touched.card_id && errors.card_id && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-card_id"
                    >
                      {errors.card_id}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputLabel sx={{ mb: 1 }}>Balance</InputLabel>
                  <OutlinedInput
                    id="balance"
                    type="number"
                    name="balance"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter balance"
                    fullWidth
                    error={Boolean(touched.balance && errors.balance)}
                  />
                  {touched.balance && errors.balance && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-balance"
                    >
                      {errors.balance}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </MainCard>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 6 }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <AnimateButton>
                  <Button
                    sx={{ textTransform: "none" }}
                    disableElevation
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

export default CreateUser;
