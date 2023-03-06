import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// material-ui
import {
  Grid,
  Stack,
  Button,
  OutlinedInput,
  InputLabel,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Typography,
  FormHelperText,
} from "@mui/material";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// project import
import * as Yup from "yup";
import { Formik } from "formik";
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { post } from "../../../utils/request";
import {
  selectGender,
  selectProvince,
  selectDistrict,
  // selectWard,
} from "../../../utils/selectRequest";
import { openSnackbar } from "../../../store/reducers/snackbar";
import useAuth from "../../../hooks/useAuth";

// assets

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function CreateUser() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [genders, setGenders] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  // const [wards, setWards] = useState([]);
  const countries = [{ id: "01", name: "Việt Nam" }];

  const handleCancel = () => {
    history(`/user/list`);
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          identity_card: null,
          email: "",
          phone: null,
          card_id: null,
          balance: 0,
          password: null,
          provider: "local",
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          username: Yup.string()
            .min(1)
            .max(255)
            .required("Username is required"),
          phone: Yup.string()
            .matches("^0[0-9]{9,10}$", "Please enter a valid Phone")
            .min(10, "Please enter a valid Phone")
            .max(11, "Please enter a valid Phone")
            .nullable(),
          identity_card: Yup.string()
            .matches("^[0-9]*$", "Please enter a valid Identity Card")
            .max(12, "No more than 20 characters")
            .nullable(),
          balance: Yup.number().min(0).nullable(),
          password: Yup.string().required("Password must be required"),
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
                      message: `User ${values.usernam} was created`,
                      variant: "alert",
                      alert: {
                        color: "success",
                      },
                      close: false,
                    })
                  ),
                  setSubmitting(true),
                  setStatus({ success: true }),
                  // history(`/user/list`),
                  console.log(response.data),
                  history(`/user/view/${response.data.data.id}`)
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
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1 }}>
                    Email
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
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    readOnly
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
                    Username
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
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your Username"
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
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your phone"
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
                    value={values.identity_card}
                    name="identity_card"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your Identity"
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
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1 }}>Password</InputLabel>
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
                  <InputLabel sx={{ mb: 1 }}>RFID</InputLabel>
                  <OutlinedInput
                    id="card_id"
                    type="text"
                    value={values.card_id}
                    name="card_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your Identity"
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
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1 }}>Provicer</InputLabel>
                  <OutlinedInput
                    id="provider"
                    type="text"
                    value={values.provider}
                    name="provider"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your Identity"
                    fullWidth
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
                  <InputLabel sx={{ mb: 1 }}>Balance</InputLabel>
                  <OutlinedInput
                    id="balance"
                    type="number"
                    value={values.balance}
                    name="balance"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your balance"
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
