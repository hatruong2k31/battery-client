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
  Checkbox,
  FormControlLabel,
  MenuItem,
  Typography,
  FormHelperText,
} from "@mui/material";

// project import
import * as Yup from "yup";
import { Formik } from "formik";
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { post } from "../../../utils/request";
import { openSnackbar } from "../../../store/reducers/snackbar";
import useAuth from "../../../hooks/useAuth";

import {
  getDecisionTimeframes,
  getLeadSources,
  getLeadStatuss,
  getProductInterests,
  getIndustries,
  getEmployees,
} from "../../../store/reducers/masterData";
import {
  selectProvince,
  selectDistrict,
  // selectWard,
} from "../../../utils/selectRequest";
// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddNewLead() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [authState, authDispatch] = useAuth();
  const { user } = authState;
  const countries = [{ id: "01", name: "Việt Nam" }];
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const {
    employees,
    industries,
    decisionTimeframes,
    productInterests,
    leadSources,
    leadStatuss,
  } = useSelector((state) => state.masterData);

  useEffect(() => {
    dispatch(getDecisionTimeframes());
    dispatch(getIndustries());
    dispatch(getEmployees());
    dispatch(getLeadSources());
    dispatch(getLeadStatuss());
    dispatch(getProductInterests());
  }, [dispatch]);

  useEffect(() => {
    selectProvince().then((response) => {
      return setProvinces(response.data);
    });
  }, []);

  const handleCancel = () => {
    history(`/lead/list`);
  };

  return (
    <>
      <Formik
        initialValues={{
          lastname: "",
          identity_card: "",
          email: "",
          lead_source: "",
          lead_status: "",
          number_of_employees: "",
          industry: "",
          mobile_phone: "",
          phone: "",
          country: "01",
          district: "",
          province: "",
          annual_revenue: "",
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          firstname: Yup.string()
            .matches(
              "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$[0-9]?"
            )
            .max(70, "No more than 70 characters")
            .nullable(),
          middlename: Yup.string()
            .matches(
              "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$[0-9]?"
            )
            .max(70, "No more than 70 characters")
            .nullable(),
          lastname: Yup.string()
            .matches(
              "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$[0-9]?"
            )
            .max(70, "No more than 70 characters")
            .required("Last Name must be completed"),
          title: Yup.string()
            .max(255, "No more than 255 characters")
            .nullable(),
          description: Yup.string()
            .max(255, "No more than 255 characters")
            .nullable(),
          company: Yup.string()
            .max(255, "No more than 255 characters")
            .nullable(),
          website: Yup.string()
            .max(255, "No more than 255 characters")
            .nullable(),
          product_interest: Yup.string().nullable(),
          decision_timeframe: Yup.string().nullable(),
          lead_source: Yup.string().required("Lead Source must be complete"),
          lead_status: Yup.string().required("Lead Status must be complete"),
          number_of_employees: Yup.string().nullable(),
          annual_revenue: Yup.string()
            .max(18, "No more than 18 characters")
            // .min(0)
            .nullable("Please enter a valid Annual Revenue"),
          email: Yup.string()
            .email("Please enter a valid Email")
            .max(255, "No more than 255 characters")
            .required("Email must be completed"),
          phone: Yup.string()
            .matches("^0[0-9]{9,10}$", "Please enter a valid Phone")
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
          ward: Yup.string().nullable(),
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
            if (values.has_budget === false || null) {
              values.has_budget = false;
            }
            if (values.decision_maker === false || null) {
              values.decision_maker = false;
            }
            if (values.bantos === false || null) {
              values.bantos = false;
            }
            if (values.project_defined === false || null) {
              values.project_defined = false;
            }
            if (values.dead_comment_of_sales === false || null) {
              values.dead_comment_of_sales = false;
            }
            if (!values.annual_revenue) {
              values.annual_revenue = null;
            }
            await post(`api/lead/`, values).then(function (response) {
              if (response.status === 200) {
                return (
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: `Lead ${values.name} was created`,
                      variant: "alert",
                      alert: {
                        color: "success",
                      },
                      close: false,
                    })
                  ),
                  setSubmitting(true),
                  setStatus({ success: true }),
                  history(`/lead/list`)
                  // history(`/lead/view/${response.data.data[0].id}`)
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
              <MainCard title="Add New Lead">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MainCard title="Lead information">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <InputLabel sx={{ mb: 1 }}>First Name</InputLabel>
                          <OutlinedInput
                            id="firstname"
                            type="text"
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
                            name="lastname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.lastname && errors.lastname)}
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
                          <InputLabel sx={{ mb: 1 }}>Title</InputLabel>
                          <OutlinedInput
                            id="title"
                            type="text"
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
                          <InputLabel sx={{ mb: 1 }}>Company</InputLabel>
                          <OutlinedInput
                            id="company"
                            type="text"
                            name="company"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.company && errors.company)}
                            fullWidth
                          />
                          {touched.company && errors.company && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-company"
                            >
                              {errors.company}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel sx={{ mb: 1 }} htmlFor="website">
                            Website
                          </InputLabel>
                          <OutlinedInput
                            placeholder="Website"
                            fullWidth
                            type="text"
                            id="website"
                            name="website"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.website && errors.website)}
                          />
                          {touched.website && errors.website && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-website"
                            >
                              {errors.website}
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
                          <InputLabel sx={{ mb: 1 }} htmlFor="annual_revenue">
                            Annual Revenue
                          </InputLabel>
                          <OutlinedInput
                            id="annual_revenue"
                            type="number"
                            name="annual_revenue"
                            // InputProps={{ inputProps: { min: 0 } }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(
                              touched.annual_revenue && errors.annual_revenue
                            )}
                            fullWidth
                          />
                          {touched.annual_revenue && errors.annual_revenue && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-annual_revenue"
                            >
                              {errors.annual_revenue}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel
                            sx={{ mb: 1 }}
                            htmlFor="number_of_employees"
                          >
                            Employees
                          </InputLabel>
                          <TextField
                            placeholder="Choose Employees"
                            fullWidth
                            select
                            id="number_of_employees"
                            name="number_of_employees"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            defaultValue={values?.number_of_employees || ""}
                          >
                            {employees.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                          {touched.number_of_employees &&
                            errors.number_of_employees && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-number_of_employees"
                              >
                                {errors.number_of_employees}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel sx={{ mb: 1 }} htmlFor="industry">
                            Industry
                          </InputLabel>
                          <TextField
                            placeholder="Choose industry"
                            fullWidth
                            select
                            id="industry"
                            name="industry"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            defaultValue={values?.industry || ""}
                          >
                            {industries.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel sx={{ mb: 1 }} htmlFor="lead_source">
                            Lead Source
                            <Typography
                              component="span"
                              variant="caption"
                              sx={{ color: `error.main` }}
                            >
                              *
                            </Typography>
                          </InputLabel>
                          <TextField
                            placeholder="Choose Source"
                            fullWidth
                            variant="outlined"
                            select
                            id="lead_source"
                            name="lead_source"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            defaultValue={values?.lead_source || ""}
                            error={Boolean(
                              touched.lead_source && errors.lead_source
                            )}
                          >
                            {leadSources.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                          {touched.lead_source && errors.lead_source && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-lead_source"
                            >
                              {errors.lead_source}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel sx={{ mb: 1 }} htmlFor="lead_status">
                            Lead Status
                            <Typography
                              component="span"
                              variant="caption"
                              sx={{ color: `error.main` }}
                            >
                              *
                            </Typography>
                          </InputLabel>
                          <TextField
                            placeholder="Choose Status"
                            fullWidth
                            select
                            variant="outlined"
                            id="lead_status"
                            name="lead_status"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            defaultValue={values?.lead_status || ""}
                            error={Boolean(
                              touched.lead_status && errors.lead_status
                            )}
                          >
                            {leadStatuss.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                          {touched.lead_status && errors.lead_status && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-lead_status"
                            >
                              {errors.lead_status}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <InputLabel sx={{ mb: 1 }}>Description</InputLabel>
                          <OutlinedInput
                            id="description"
                            type="text"
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
                          <InputLabel sx={{ mt: 1 }}>
                            Lead Owner :
                            <Typography
                              component="span"
                              variant="caption"
                              sx={{ fontWeight: 1000, fontSize: 15 }}
                            >
                              {" " + user.username}
                            </Typography>
                          </InputLabel>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12}>
                    <MainCard title="Address information">
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <InputLabel sx={{ mb: 1 }}>Country</InputLabel>
                          <TextField
                            name="country"
                            select
                            id="country"
                            placeholder="Select Country"
                            fullWidth
                            defaultValue={values?.country || ""}
                            variant="outlined"
                            onChange={(e) => (
                              setFieldValue("country", e.target.value),
                              selectProvince(e.target.value).then(
                                (response) => {
                                  return setProvinces(response.data);
                                }
                              )
                            )}
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
                    <MainCard title="Other Information">
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <InputLabel sx={{ mb: 1 }} htmlFor="product_interest">
                            Product Interest
                          </InputLabel>
                          <TextField
                            placeholder="Choose Product Interest"
                            fullWidth
                            select
                            id="product_interest"
                            name="product_interest"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            defaultValue={values?.product_interest || ""}
                          >
                            {productInterests.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel
                            sx={{ mb: 1 }}
                            htmlFor="decision_timeframe"
                          >
                            Decision Timeframe
                          </InputLabel>
                          <TextField
                            placeholder="Choose Decision Timeframe"
                            fullWidth
                            select
                            id="decision_timeframe"
                            name="decision_timeframe"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            defaultValue={values?.decision_timeframe || ""}
                          >
                            {decisionTimeframes.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <InputLabel sx={{ mb: 1 }}>Object</InputLabel>
                          <OutlinedInput
                            id="object"
                            type="text"
                            name="object"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.object && errors.object)}
                            fullWidth
                          />
                          {touched.object && errors.object && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-object"
                            >
                              {errors.object}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControlLabel
                            label="Decision Maker"
                            control={
                              <Checkbox
                                id="decision_maker"
                                name="decision_maker"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={true}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControlLabel
                            label="Has Budget"
                            control={
                              <Checkbox
                                id="has_budget"
                                name="has_budget"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={true}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControlLabel
                            label="Project Defined"
                            control={
                              <Checkbox
                                id="project_defined"
                                name="project_defined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={true}
                              />
                            }
                          />
                        </Grid>
                        {/* <Grid item xs={12} sm={3}>
                          <FormControlLabel
                            label="BANTOS"
                            control={
                              <Checkbox
                                disabled
                                id="bantos"
                                name="bantos"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={true}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel sx={{ mb: 1 }} htmlFor="rating">
                            Rating
                          </InputLabel>
                          <OutlinedInput
                            readOnly
                            fullWidth
                            type="text"
                            id="rating"
                            name="rating"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></OutlinedInput>
                        </Grid> */}
                        <Grid item xs={12} sm={3}>
                          <FormControlLabel
                            label="Dead Comment Of Sales"
                            control={
                              <Checkbox
                                id="dead_comment_of_sales"
                                name="dead_comment_of_sales"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={true}
                              />
                            }
                          />
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

export default AddNewLead;
