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
  const [accountData, setAccountData] = useState([]);
  const [authState, authDispatch] = useAuth();
  const { user } = authState;
  useEffect(() => {
    selectGender().then((response) => {
      return setGenders(response.data);
    });
  }, [dispatch]);

  useEffect(() => {
    selectProvince().then((response) => {
      return setProvinces(response.data);
    });
  }, []);

  const handleCancel = () => {
    history(`/contact/list`);
  };

  return (
    <>
      <Formik
        initialValues={{
          lastname: "",
          birthdate: "",
          gender: "",
          identity_card: "",
          email: "",
          account_id: "",
          mobile_phone: "",
          phone: "",
          homephone: "",
          country: "01",
          district: "",
          province: "",
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          firstname: Yup.string()
            .matches(
              "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$[0-9]?",
              "Please enter a valid First Name"
            )
            .max(70, "No more than 70 characters")
            .nullable(),
          middlename: Yup.string()
            .matches(
              "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$[0-9]?",
              "Please enter a valid First Name"
            )
            .max(70, "No more than 70 characters")
            .nullable(),
          lastname: Yup.string()
            .matches(
              "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$[0-9]?",
              "Please enter a valid First Name"
            )
            .max(70, "No more than 70 characters")
            .required("Last Name must be completed"),
          description: Yup.string()
            .max(255, "No more than 255 characters")
            .nullable(),
          birthdate: Yup.date()
            .max(moment(Date.now()), "No more than today")
            .nullable(),
          account_id: Yup.string()
            .required("Account Name must be completed")
            .nullable("Account Name must be completed"),
          gender: Yup.string().nullable(),
          title: Yup.string()
            .max(255, "No more than 255 characters")
            .nullable(),
          department: Yup.string()
            .max(255, "No more than 255 characters")
            .nullable(),
          identity_card: Yup.string()
            .matches("^[0-9]*$", "Please enter a valid Identity Card")
            .max(20, "No more than 20 characters")
            .required("Identity Card must be completed"),
          email: Yup.string()
            .email("Please enter a valid Email")
            .max(255, "No more than 255 characters")
            .required("Email must be completed"),
          phone: Yup.string()
            .matches("^0[0-9]{9,10}$", "Please enter a valid Phone")
            .min(10, "Please enter a valid Phone")
            .max(11, "Please enter a valid Phone")
            .nullable(),
          homephone: Yup.string()
            .matches("^0[0-9]{9,10}$", "Please enter a valid Home Phone")
            .min(10, "Please enter a valid Phone")
            .max(11, "Please enter a valid Phone")
            .nullable(),
          mobile_phone: Yup.string()
            .matches("^0[0-9]{9,10}$", "Please enter a valid Mobile Phone")
            .min(10, "Please enter a valid Phone")
            .max(11, "Please enter a valid Phone")
            .required("Mobile Phone must be completed"),
          street: Yup.string()
            .max(255, "No more than 255 characters")
            .nullable(),
          district: Yup.string().nullable(),
          country: Yup.string().nullable(),
          province: Yup.string().nullable(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (values.middlename) {
              values.middlename = values.middlename.trim();
            }
            if (values.firstname) {
              values.firstname = values.firstname.trim();
            }
            values.lastname = values.lastname.trim();
            values.name =
              values.firstname && values.middlename // nếu có f và m
                ? values.lastname.concat(
                    " ",
                    values.middlename,
                    " ",
                    values.firstname
                  )
                : values.firstname && !values.middlename //nếu có f và không có m
                ? values.lastname.concat(" ", values.firstname)
                : !values.firstname && values.middlename //nếu có m và không có f
                ? values.lastname.concat(" ", values.middlename)
                : values.lastname; //chỉ có l
            if (values.donotcall === false || null) {
              values.donotcall = false;
            }
            if (values.birthdate) {
              values.birthdate = new Date(values.birthdate);
            } else {
              values.birthdate = null;
            }
            // values.address = values.street.concat(", ",values.city,", ", values.province, ", ", values.country)
            await post(`api/contact/`, values).then(function (response) {
              if (response.status === 200) {
                return (
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: `Contact ${values.name} was created`,
                      variant: "alert",
                      alert: {
                        color: "success",
                      },
                      close: false,
                    })
                  ),
                  setSubmitting(true),
                  setStatus({ success: true }),
                  history(`/contact/list`)
                  // history(`/contact/view/${response.data.data[0].id}`)
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
            {
              <MainCard title="Add new User">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Email</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter email"
                      fullWidth
                      onChange={handleChange}
                      name="auth.email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Username</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter name"
                      fullWidth
                      onChange={handleChange}
                      name="auth.username"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Password</InputLabel>
                    <TextField
                      type="password"
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter password"
                      fullWidth
                      onChange={handleChange}
                      name="auth.password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Name</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter product name"
                      fullWidth
                      onChange={handleChange}
                      name="org.name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Phone</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter phone"
                      fullWidth
                      onChange={handleChange}
                      name="org.phone"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Balance</InputLabel>
                    <TextField
                      type="number"
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter address"
                      fullWidth
                      onChange={handleChange}
                      name="org.address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="right"
                      alignItems="center"
                    >
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        variant="contained"
                        type="submit"
                      >
                        Add
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            }
          </form>
        )}
      </Formik>
    </>
  );
}

export default CreateUser;
