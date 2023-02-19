import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
// project imports
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "../../../store";
import { getContact } from "../../../store/reducers/payment";
import MainCard from "../../../components/MainCard";
import { put, del } from "../../../utils/request";
import { selectProvince, selectDistrict } from "../../../utils/selectRequest";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { getGenders } from "../../../store/reducers/masterData";

const EditContact = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  // const [wards, setWards] = useState([]);
  const countries = [{ id: "01", name: "Việt Nam" }];
  const { genders } = useSelector((state) => state.masterData);
  const { contact } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContact(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (contact && contact.id === Number(id)) {
      selectProvince(contact?.country).then((response) =>
        setProvinces(response.data)
      );
      selectDistrict(contact?.province).then((response) =>
        setDistricts(response.data)
      );
    }
  }, [contact]);

  const handleCancel = () => {
    history(`/contact/list`);
  };

  return (
    <>
      {contact && contact.id === Number(id) && (
        <Formik
          initialValues={{ ...contact }}
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
                "Please enter a valid Middle Name"
              )
              .max(70, "No more than 70 characters")
              .nullable(),
            lastname: Yup.string()
              .matches(
                "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$[0-9]?",
                "Please enter a valid Last Name"
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
              await put(`api/contact/detail/${id}`, values)
                .then(function (response) {
                  if (response.status === 200) {
                    return (
                      dispatch(
                        openSnackbar({
                          open: true,
                          message: `Contact ${values?.name} was updated`,
                          variant: "alert",
                          alert: {
                            color: "success",
                          },
                          close: false,
                        })
                      ),
                      setSubmitting(true),
                      setStatus({ success: true }),
                      dispatch(getContact(id)),
                      history(`/contact/list`)
                    );
                  } else {
                    return (
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
                      ),
                      setSubmitting(false),
                      setStatus({ success: false })
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
                    setStatus({ success: false })
                  );
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
              {contact && contact.id === Number(id) && (
                <MainCard title="Edit Contact">
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
                              value={values.birthdate}
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
                                    <TextField
                                      error={Boolean(
                                        touched.birthdate && errors.birthdate
                                      )}
                                      {...params}
                                    />
                                  )}
                                  mask="__/__/____"
                                  maxDate={Date.now()}
                                  fullWidth
                                />
                              </Stack>
                            </LocalizationProvider>
                            {touched.birthdate && errors.birthdate && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-birthdate"
                              >
                                {errors.birthdate}
                              </FormHelperText>
                            )}
                          </Grid> */}
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Gender</InputLabel>
                            <TextField
                              name="gender"
                              select
                              id="gender"
                              placeholder="Select Gender"
                              fullWidth
                              defaultValue={values?.gender || ""}
                              onChange={handleChange}
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
                              Mobile
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
                              Contact Owner :
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ fontWeight: 1000, fontSize: 15 }}
                              >
                                {" " + values?.owner_name}
                              </Typography>
                            </InputLabel>
                          </Grid>
                        </Grid>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Address Information">
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Country</InputLabel>
                            <TextField
                              name="country"
                              select
                              id="country"
                              placeholder="Select Country"
                              fullWidth
                              defaultValue={values?.country || "1"}
                              variant="outlined"
                              onChange={(e) => (
                                setFieldValue("country", e.target.value),
                                selectProvince(e.target.value).then(
                                  (response) => {
                                    return setProvinces(response.data);
                                  }
                                )
                              )}
                              // onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {countries.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Province</InputLabel>
                            <TextField
                              name="province"
                              select
                              id="province"
                              placeholder="Select Province"
                              fullWidth
                              defaultValue={values?.province || ""}
                              variant="outlined"
                              onChange={(e) => (
                                setFieldValue("province", e.target.value),
                                selectDistrict(e.target.value).then(
                                  (response) => {
                                    return setDistricts(response.data);
                                  }
                                )
                              )}
                              onBlur={handleBlur}
                            >
                              {provinces.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>District</InputLabel>
                            <TextField
                              // disable={}
                              name="district"
                              select
                              id="district"
                              placeholder="Select District"
                              fullWidth
                              defaultValue={values?.district || ""}
                              variant="outlined"
                              // onChange={(e) => {
                              //   console.log(e.target);
                              //   return (
                              //     handleChange,
                              //     selectWard(e.target.value).then(
                              //       (response) => {
                              //         return setWards(response.data);
                              //       }
                              //     )
                              //   );
                              // }}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {districts.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          {/* <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Ward</InputLabel>
                            <TextField
                              // disable={}
                              name="ward"
                              select
                              id="ward"
                              placeholder="Select Ward"
                              fullWidth
                              defaultValue={values?.ward}
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {wards.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid> */}
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
                        </Grid>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        justifyContent="right"
                        alignItems="center"
                        spacing={2}
                        sx={{ mt: 2 }}
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
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Updated
                        </Button>
                      </Stack>
                    </Grid>
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
