import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
// project imports
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "../../../store";
import { getContact } from "../../../store/reducers/contact";
import { getAccounts } from "../../../store/reducers/account";
import MainCard from "../../../components/MainCard";
import { put } from "../../../utils/request";
import { selectGender } from "../../../utils/selectRequest";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { del } from "../../../utils/request";

const EditContact = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [genders, setGenders] = useState([]);

  const dispatch = useDispatch();
  const { contact } = useSelector((state) => state.contact);
  const { accounts } = useSelector((state) => state.account);
  const [accountData, setAccountData] = useState([]);

  // time
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "-" + mm + "-" + yyyy;

  useEffect(() => {
    selectGender().then((response) => {
      return setGenders(response.data);
    });
    dispatch(getAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (accounts) {
      setAccountData(accounts);
    }
  }, [accounts]);

  useEffect(() => {
    dispatch(getContact(id));
  }, [id, dispatch]);

  const handleCancel = () => {
    history(`/contact/list`);
  };

  return (
    <>
      {contact && contact.data[0].id === Number(id) && (
        <Formik
          initialValues={contact?.data[0]}
          enableReinitialize
          validationSchema={Yup.object().shape({
            firstname: Yup.string()
              .matches(
                "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$",
                "Please enter a valid First Name"
              )
              .nullable(),
            middlename: Yup.string()
              .matches(
                "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$",
                "Please enter a valid Middlename Name"
              )
              .nullable(),
            lastname: Yup.string()
              .matches(
                "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$",
                "Please enter a valid Last Name"
              )
              .required("Last Name must be completed"),
            description: Yup.string().max(255).nullable(),
            account_name: Yup.string().nullable(),
            gender: Yup.string().nullable(),
            title: Yup.string().nullable(),
            department: Yup.string().nullable(),
            identity_card: Yup.string()
              .matches("^[0-9]*$", "Please enter a valid Identity Card")
              .max(12)
              .required("Identity Card must be completed"),
            email: Yup.string()
              .email("Please enter a valid Email")
              .max(255)
              .required("Email must be completed"),
            phone: Yup.string()
              .matches("^0[0-9]{9,10}$", "Please enter a valid Phone")
              .min(10)
              .max(11)
              .nullable(),
            homephone: Yup.string()
              .matches("^0[0-9]{9,10}$", "Please enter a valid Home Phone")
              .min(10)
              .max(11)
              .nullable(),
            mobile_phone: Yup.string()
              .matches("^0[0-9]{9,10}$", "Please enter a valid Mobile Phone")
              .min(10)
              .max(11)
              .required("Mobile Phone must be completed"),
            street: Yup.string().nullable(),
            city: Yup.string().nullable(),
            country: Yup.string().nullable(),
            province: Yup.string().nullable(),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (values.donotcall === false || null) {
                values.donotcall = false;
              }

              await put(`api/contact/detail/${id}`, values)
                .then(function (response) {
                  if (response.status === 200) {
                    return (
                      dispatch(
                        openSnackbar({
                          open: true,
                          message: "Submit Success",
                          variant: "alert",
                          alert: {
                            color: "success",
                          },
                          close: false,
                        })
                      ),
                      setSubmitting(true),
                      setStatus({ success: true }),
                      history(`/contact/edit/${id}`)
                    );
                  } else {
                    return (
                      dispatch(
                        openSnackbar({
                          open: true,
                          message: response?.error?.message,
                          variant: "alert",
                          alert: {
                            color: "error",
                          },
                          close: false,
                        })
                      ),
                      setSubmitting(false),
                      setStatus({ success: false }),
                      setErrors({ submit: response?.error?.message })
                    );
                  }
                })
                .catch(function (error) {
                  return (
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: error.response?.data?.message || error.message,
                        variant: "alert",
                        alert: {
                          color: "error",
                        },
                        close: false,
                      })
                    ),
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
            setFieldValue,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              {contact && contact.data[0].id === Number(id) && (
                <MainCard title="Edit Contact">
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ p: 0, pb: 0 }}
                    spacing={1}
                  >
                    <Button
                      variant="contained"
                      onClick={async () => {
                        if (
                          !window.confirm(
                            `Are you sure you want to delete ${contact.data[0].lastname}`
                          )
                        ) {
                          return;
                        }
                        del(`/api/contact/${contact.data[0].id}`).then(
                          (response) => {
                            if (response.status === 200) {
                              dispatch(
                                openSnackbar({
                                  open: true,
                                  message: "Delete Success",
                                  variant: "alert",
                                  alert: {
                                    color: "success",
                                  },
                                  close: false,
                                })
                              );
                              history(`/contact/list`);
                            } else {
                              dispatch(
                                openSnackbar({
                                  open: true,
                                  message: `Delete Error! ${response?.message}`,
                                  variant: "alert",
                                  alert: {
                                    color: "error",
                                  },
                                  close: false,
                                })
                              );
                            }
                          }
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <MainCard title="Contact information">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>First Name</InputLabel>
                            <OutlinedInput
                              id="firstname"
                              type="text"
                              value={values?.firstname}
                              name="firstname"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.firstname && errors.firstname
                              )}
                              fullWidth
                            />
                            {touched.firstname && errors.firstname && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-firstname"
                              >
                                {errors.firstname}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Middle Name</InputLabel>
                            <OutlinedInput
                              id="middlename"
                              type="text"
                              value={values?.middlename}
                              name="middlename"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.middlename && errors.middlename
                              )}
                              fullWidth
                            />
                            {touched.middlename && errors.middlename && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-middlename"
                              >
                                {errors.middlename}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Last Name
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: `error.main` }}
                              >
                                *
                              </Typography>
                            </InputLabel>
                            <OutlinedInput
                              id="lastname"
                              type="text"
                              value={values?.lastname}
                              name="lastname"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.lastname && errors.lastname
                              )}
                              fullWidth
                            />
                            {touched.lastname && errors.lastname && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-lastname"
                              >
                                {errors.lastname}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Identity Card
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: `error.main` }}
                              >
                                *
                              </Typography>
                            </InputLabel>
                            <OutlinedInput
                              id="identity_card"
                              type="text"
                              value={values?.identity_card}
                              name="identity_card"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.identity_card && errors.identity_card
                              )}
                              fullWidth
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
                            <InputLabel sx={{ mb: 1 }}>BirthDate</InputLabel>
                            <TextField
                              id="birthdate"
                              type="date"
                              name="birthdate"
                              value={
                                values?.birthdate ? values.birthdate : null
                              }
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.birthdate && errors.birthdate
                              )}
                              fullWidth
                            />
                            {touched.birthdate && errors.birthdate && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-birthdate"
                              >
                                {errors.birthdate}
                              </FormHelperText>
                            )}
                          </Grid>
                          {/* <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>BirthDate</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Stack>
                                <DatePicker
                                  hideTabs
                                  id="birthdate"
                                  value={values?.birthdate}
                                  name="birthdate"
                                  onBlur={handleBlur}
                                  onChange={(value) => {
                                    setFieldValue(
                                      "birthdate",
                                      Date.parse(value)
                                    );
                                  }}
                                  closeOnSelect
                                  inputFormat="DD/MM/YYYY"
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                  mask="__/__/____"
                                  maxDate={dayjs(today)}
                                  fullWidth
                                />
                              </Stack>
                            </LocalizationProvider>
                          </Grid> */}
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Gender</InputLabel>
                            <TextField
                              name="gender"
                              select
                              id="gender"
                              placeholder="Select Gender"
                              fullWidth
                              defaultValue={values?.gender || "0"}
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {genders.map((option) => (
                                <MenuItem key={option.id} value={option.code}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Mobile Phone
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: `error.main` }}
                              >
                                *
                              </Typography>
                            </InputLabel>
                            <OutlinedInput
                              id="mobile_phone"
                              type="text"
                              value={values?.mobile_phone}
                              name="mobile_phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.mobile_phone && errors.mobile_phone
                              )}
                              fullWidth
                            />
                            {touched.mobile_phone && errors.mobile_phone && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-mobile_phone"
                              >
                                {errors.mobile_phone}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                            <OutlinedInput
                              id="phone"
                              type="text"
                              value={values?.phone}
                              name="phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.phone && errors.phone)}
                              fullWidth
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
                            <InputLabel sx={{ mb: 1 }}>Home Phone</InputLabel>
                            <OutlinedInput
                              id="homephone"
                              type="text"
                              value={values?.homephone}
                              name="homephone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.homephone && errors.homephone
                              )}
                              fullWidth
                            />
                            {touched.homephone && errors.homephone && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-homephone"
                              >
                                {errors.homephone}
                              </FormHelperText>
                            )}
                          </Grid>
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
                              type="text"
                              value={values?.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.email && errors.email)}
                              fullWidth
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
                            <InputLabel sx={{ mb: 1 }}>Title</InputLabel>
                            <OutlinedInput
                              id="title"
                              type="text"
                              value={values?.title}
                              name="title"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.title && errors.title)}
                              fullWidth
                            />
                            {touched.title && errors.title && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-title"
                              >
                                {errors.title}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Department</InputLabel>
                            <OutlinedInput
                              id="department"
                              type="text"
                              value={values?.department}
                              name="department"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.department && errors.department
                              )}
                              fullWidth
                            />
                            {touched.department && errors.department && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-department"
                              >
                                {errors.department}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <InputLabel sx={{ mb: 1 }}>
                              Account Name - Email
                            </InputLabel>
                            <TextField
                              name="account_name"
                              select
                              id="account_name"
                              placeholder="Select an Account"
                              fullWidth
                              defaultValue={values?.account_id || ""}
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {accountData.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name} - {option.email}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <InputLabel sx={{ mb: 1 }}>Description</InputLabel>
                            <OutlinedInput
                              id="description"
                              type="text"
                              value={values?.description}
                              name="description"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              rows={2}
                              multiline
                              error={Boolean(
                                touched.description && errors.description
                              )}
                              fullWidth
                            />
                            {touched.description && errors.description && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-description"
                              >
                                {errors.description}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              label="Do not call"
                              control={
                                <Checkbox
                                  id="donotcall"
                                  name="donotcall"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  defaultChecked={
                                    values?.donotcall ? true : false
                                  }
                                  value={true}
                                />
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mt: 1 }}>
                              Contact Owner : {values?.owner_name}
                            </InputLabel>
                          </Grid>
                          {/* <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Create By Name
                            </InputLabel>
                            <OutlinedInput
                              readOnly
                              id="created_by_name"
                              type="text"
                              value={values?.created_by_name}
                              name="created_by_name"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Update By Name
                            </InputLabel>
                            <OutlinedInput
                              readOnly
                              id="updated_by_name"
                              type="text"
                              value={values?.updated_by_name}
                              name="updated_by_name"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Create At</InputLabel>
                            <OutlinedInput
                              readOnly
                              id="created_at"
                              type="text"
                              value={values?.created_at
                                ?.replace("T", " ")
                                ?.slice(0, 19)}
                              name="created_at"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Update At</InputLabel>
                            <TextField
                              readOnly
                              id="updated_at"
                              type="text"
                              value={values?.updated_at
                                ?.replace("T", " ")
                                ?.slice(0, 19)}
                              name="updated_at"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Convert From Lead Name
                            </InputLabel>
                            <OutlinedInput
                              readOnly
                              id="convert_from_lead_name"
                              type="text"
                              value={values?.convert_from_lead_name}
                              name="convert_from_lead_name"
                              fullWidth
                            />
                          </Grid> */}
                        </Grid>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Address information">
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Street</InputLabel>
                            <OutlinedInput
                              id="street"
                              type="text"
                              value={values?.street}
                              name="street"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.street && errors.street)}
                              fullWidth
                            />
                            {touched.street && errors.street && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-street"
                              >
                                {errors.street}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>City</InputLabel>
                            <OutlinedInput
                              id="city"
                              type="text"
                              value={values?.city}
                              name="city"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.city && errors.city)}
                              fullWidth
                            />
                            {touched.city && errors.city && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-city"
                              >
                                {errors.city}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Province</InputLabel>
                            <OutlinedInput
                              id="province"
                              type="text"
                              value={values?.province}
                              name="address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.province && errors.province
                              )}
                              fullWidth
                            />
                            {touched.province && errors.province && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-province"
                              >
                                {errors.province}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Country</InputLabel>
                            <OutlinedInput
                              id="country"
                              type="text"
                              value={values?.country}
                              name="country"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.country && errors.country)}
                              fullWidth
                            />
                            {touched.country && errors.country && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-country"
                              >
                                {errors.country}
                              </FormHelperText>
                            )}
                          </Grid>
                        </Grid>
                      </MainCard>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{ mt: 6 }}
                    >
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        sx={{ textTransform: "none" }}
                        disableElevation
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Update
                      </Button>
                    </Stack>
                  </Grid>
                </MainCard>
              )}
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditContact;
