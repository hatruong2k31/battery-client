import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

// material-ui
import {
  Grid,
  Stack,
  InputLabel,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// project imports
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "../../../store";
import { getAccountEdit } from "../../../store/reducers/account";
import {
  getAccountTypes,
  getIndustries,
  getEmployees,
} from "../../../store/reducers/masterData";
import { getAccounts } from "../../../store/reducers/account";
import MainCard from "../../../components/MainCard";

import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";

const EditAccount = () => {
  const history = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { accountEdit } = useSelector((state) => state.account);
  const { accountTypes, employees, industries } = useSelector(
    (state) => state.masterData
  );
  const { accounts } = useSelector((state) => state.account);

  const [show, setShow] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [isPersonAccountState, setIsPersonAccountState] = useState(false);
  const [defaultYearStarted, setDefaultYearStarted] = useState(
    dayjs("2022-04-07")
  );

  useEffect(() => {
    dispatch(getAccountTypes());
    dispatch(getIndustries());
    dispatch(getEmployees());
    dispatch(getAccounts());
    dispatch(getAccountEdit(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accounts) {
      setAccountData(accounts);
    }
  }, [accounts]);

  useEffect(() => {
    if (accountEdit) {
      setDefaultYearStarted(accountEdit.accountData[0].year_started);
    }
  }, [accountEdit]);

  const handleCancel = () => {
    history(`/account/list`);
  };

  const onSelectChange = (e) => {
    const isPersonAccount = accountTypes.find(
      (a) => a.code === e.target.value
    ).is_person_account;

    setShow(isPersonAccount);
    setIsPersonAccountState(isPersonAccount);
  };

  return (
    <>
      {accountEdit && accountEdit.accountData[0].id === Number(id) && (
        <Formik
          initialValues={accountEdit?.accountData[0]}
          enableReinitialize
          validationSchema={yup.object().shape({
            type: yup.string().required("Type is required"),
            name: yup
              .string()
              .required("Account Name must be completed")
              .matches(
                "^((?![!@#$%^&*~`\\\\(\\\\)_+-=\\[\\]{};':\"\\|,.<>/?]).)*$"
              )
              .max(255),
            site: yup.string().max(255),
            accountsource: yup.string().max(255),
            email: yup
              .string()
              .email("Please enter a valid Email Address")
              .required("Email must be completed"),
            phone: isPersonAccountState
              ? yup.string().matches("^0[0-9]{9,10}$")
              : yup
                  .string()
                  .required("Phone is required")
                  .matches("^0[0-9]{9,10}$"),
            mobile_phone: !isPersonAccountState
              ? yup.string().matches("^0[0-9]{9}$")
              : yup
                  .string()
                  .required("Mobile must be completed")
                  .matches("^0[0-9]{9}$"),
            tax_code: !isPersonAccountState
              ? yup.string().max(18)
              : yup.string().required("Tax Code is required").max(18),
            description: yup.string().max(255),
            identity_card: isPersonAccountState
              ? yup
                  .string()
                  .required("Itendity Card must be completed")
                  .matches("^[0-9]*$", "Please enter a valid Identity Card")
              : yup.string(),
          })}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting, validate }
          ) => {
            try {
              console.log(values);
              validate(values);
              const token = JSON.parse(localStorage.getItem("token"));
              const header = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };

              await axios.put(`/api/account/detail/${id}`, values, header).then(
                () => {
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
                  );
                },
                (err) => {
                  console.log(err);
                  setStatus({ success: false });
                  setErrors({ submit: err.error.message || err.message });
                  setSubmitting(false);
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: err.error.message || err.message,
                      variant: "alert",
                      alert: {
                        color: "error",
                      },
                      close: false,
                    })
                  );
                }
              );
            } catch (err) {
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
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <MainCard title="Update Account">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MainCard title="Account information">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="type">
                              Account Type
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: `error.main` }}
                              >
                                *
                              </Typography>
                            </InputLabel>
                            <TextField
                              placeholder="Choose Account Type"
                              fullWidth
                              select
                              id="type"
                              name="type"
                              onChange={onSelectChange}
                              defaultValue={values.type || "1"}
                              disabled={true}
                            >
                              {accountTypes.map((option) => (
                                <MenuItem key={option.id} value={option.code}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <Typography color="secondary">
                              Account Owner
                            </Typography>
                            <Typography>{values.owner_name || ""}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="name">
                              Account Name
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: `error.main` }}
                              >
                                *
                              </Typography>
                            </InputLabel>
                            <TextField
                              fullWidth
                              defaultValue={values.name || ""}
                              id="name"
                              placeholder="Account Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              name="name"
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          </Stack>
                        </Grid>
                        {show && (
                          <>
                            <Grid item xs={12} sm={6}>
                              <Stack spacing={1.25}>
                                <InputLabel htmlFor="identity_card">
                                  Identity Card
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{ color: `error.main` }}
                                  >
                                    *
                                  </Typography>
                                </InputLabel>
                                <TextField
                                  placeholder="Identity Card"
                                  fullWidth
                                  type="text"
                                  id="identity_card"
                                  name="identity_card"
                                  defaultValue={values.identity_card || ""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.identity_card &&
                                      errors.identity_card
                                  )}
                                  helperText={
                                    touched.identity_card &&
                                    errors.identity_card
                                  }
                                ></TextField>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Stack spacing={1.25}>
                                <InputLabel htmlFor="birthdate">
                                  Birthdate
                                </InputLabel>
                                <TextField
                                  placeholder="Birthdate"
                                  fullWidth
                                  type="date"
                                  id="birthdate"
                                  name="birthdate"
                                  defaultValue={values.birthdate || ""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></TextField>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Stack spacing={1.25}>
                                <InputLabel htmlFor="mobile_phone">
                                  Mobile
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{ color: `error.main` }}
                                  >
                                    *
                                  </Typography>
                                </InputLabel>
                                <TextField
                                  placeholder="Mobile Phone"
                                  fullWidth
                                  type="text"
                                  id="mobile_phone"
                                  name="mobile_phone"
                                  defaultValue={values.mobile_phone || ""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(
                                    touched.mobile_phone && errors.mobile_phone
                                  )}
                                  helperText={
                                    touched.mobile_phone && errors.mobile_phone
                                  }
                                ></TextField>
                              </Stack>
                            </Grid>
                          </>
                        )}
                        {!show && (
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="tax_code">
                                Tax Code
                                <Typography
                                  component="span"
                                  variant="caption"
                                  sx={{ color: `error.main` }}
                                >
                                  *
                                </Typography>
                              </InputLabel>
                              <TextField
                                placeholder="Tax Code"
                                fullWidth
                                type="text"
                                id="tax_code"
                                name="tax_code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.tax_code || ""}
                                error={Boolean(
                                  touched.tax_code && errors.tax_code
                                )}
                                helperText={touched.tax_code && errors.tax_code}
                              ></TextField>
                            </Stack>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="phone">Phone</InputLabel>
                            <TextField
                              placeholder="Phone"
                              fullWidth
                              type="text"
                              id="phone"
                              name="phone"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              defaultValue={values.phone || ""}
                              error={Boolean(touched.phone && errors.phone)}
                              helperText={touched.phone && errors.phone}
                            ></TextField>
                          </Stack>
                        </Grid>
                        {!show && (
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="website">Website</InputLabel>
                              <TextField
                                placeholder="Website"
                                fullWidth
                                type="text"
                                id="website"
                                name="website"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.website || ""}
                              ></TextField>
                            </Stack>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="email">
                              Email
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: `error.main` }}
                              >
                                *
                              </Typography>
                            </InputLabel>
                            <TextField
                              placeholder="Email"
                              fullWidth
                              type="text"
                              id="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              defaultValue={values.email || ""}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                            ></TextField>
                          </Stack>
                        </Grid>
                        {show && <Grid item xs={12} sm={6}></Grid>}
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="site">Account Site</InputLabel>
                            <TextField
                              fullWidth
                              defaultValue={values.site || ""}
                              id="site"
                              placeholder="Account Site"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              name="site"
                              error={Boolean(touched.site && errors.site)}
                              helperText={touched.site && errors.site}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="year_started">
                                Year Started
                              </InputLabel>
                              <DatePicker
                                views={["year"]}
                                value={defaultYearStarted}
                                onChange={(newValue) => {
                                  setDefaultYearStarted(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} helperText={null} />
                                )}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </Grid>
                        {show && (
                          <>
                            <Grid item xs={12} sm={6}>
                              <Stack spacing={1.25}>
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <TextField
                                  fullWidth
                                  defaultValue={values.title || ""}
                                  id="title"
                                  placeholder="Title"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  type="text"
                                  name="title"
                                />
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Stack spacing={1.25}>
                                <InputLabel htmlFor="department">
                                  Department
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  defaultValue={values.department || ""}
                                  id="department"
                                  placeholder="Department"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  type="text"
                                  name="department"
                                />
                              </Stack>
                            </Grid>
                          </>
                        )}
                        <Grid item xs={12} sm={12}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="industry">Industry</InputLabel>
                            <TextField
                              placeholder="Choose industry"
                              fullWidth
                              select
                              id="industry"
                              name="industry"
                              onChange={handleChange}
                              defaultValue={values.industry || ""}
                            >
                              {industries.map((option) => (
                                <MenuItem key={option.id} value={option.code}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="employees">
                              Employees
                            </InputLabel>
                            <TextField
                              placeholder="Choose Employees"
                              fullWidth
                              select
                              id="employees"
                              name="employees"
                              onChange={handleChange}
                              defaultValue={values.employees || ""}
                            >
                              {employees.map((option) => (
                                <MenuItem key={option.id} value={option.code}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="total_sales">
                              Total Sales
                            </InputLabel>
                            <TextField
                              fullWidth
                              defaultValue={values.total_sales || ""}
                              id="total_sales"
                              placeholder="Total Sales"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              name="total_sales"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="accountsource">
                              Account Source
                            </InputLabel>
                            <TextField
                              fullWidth
                              defaultValue={values.accountsource || ""}
                              id="accountsource"
                              placeholder="Account Source"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              name="accountsource"
                              error={Boolean(
                                touched.accountsource && errors.accountsource
                              )}
                              helperText={
                                touched.accountsource && errors.accountsource
                              }
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="parent_account">
                              Parent Account
                            </InputLabel>
                            <TextField
                              placeholder="Choose Parent Account"
                              fullWidth
                              select
                              id="parent_account"
                              name="parent_account"
                              onChange={handleChange}
                            >
                              {accountData.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name} - {option.email}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Stack spacing={1.25}>
                            <InputLabel htmlFor="description">
                              Description
                            </InputLabel>
                            <TextField
                              fullWidth
                              defaultValue={values.description || ""}
                              id="description"
                              placeholder="Description"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              name="description"
                              multiline
                              rows={2}
                              error={Boolean(
                                touched.description && errors.description
                              )}
                              helperText={
                                touched.description && errors.description
                              }
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12}>
                    <MainCard title="Address information">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="billing_address">
                                Billing Address
                              </InputLabel>
                              <TextField
                                placeholder="Billing Address"
                                fullWidth
                                type="text"
                                id="billing_address"
                                name="billing_address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.billing_address || ""}
                              ></TextField>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="billing_street">
                                Billing Street
                              </InputLabel>
                              <TextField
                                placeholder="Billing Street"
                                fullWidth
                                type="text"
                                id="billing_street"
                                name="billing_street"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.billing_street || ""}
                              ></TextField>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="billing_city">
                                Billing City
                              </InputLabel>
                              <TextField
                                placeholder="Billing City"
                                fullWidth
                                type="text"
                                id="billing_city"
                                name="billing_city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.billing_city || ""}
                              ></TextField>
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="billing_province">
                                Billing Province
                              </InputLabel>
                              <TextField
                                placeholder="Billing Province"
                                fullWidth
                                type="text"
                                id="billing_province"
                                name="billing_province"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.billing_province || ""}
                              ></TextField>
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="billing_country">
                                Billing Country
                              </InputLabel>
                              <TextField
                                placeholder="Billing Country"
                                fullWidth
                                type="text"
                                id="billing_country"
                                name="billing_country"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.billing_country || ""}
                              ></TextField>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="shipping_address">
                                Shipping Address
                              </InputLabel>
                              <TextField
                                placeholder="Shipping Address"
                                fullWidth
                                type="text"
                                id="shipping_address"
                                name="shipping_address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.shipping_address || ""}
                              ></TextField>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="shipping_street">
                                Shipping Street
                              </InputLabel>
                              <TextField
                                placeholder="Shipping Street"
                                fullWidth
                                type="text"
                                id="shipping_street"
                                name="shipping_street"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.shipping_street || ""}
                              ></TextField>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="shipping_city">
                                Shipping City
                              </InputLabel>
                              <TextField
                                placeholder="Shipping City"
                                fullWidth
                                type="text"
                                id="shipping_city"
                                name="shipping_city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.shipping_city || ""}
                              ></TextField>
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="shipping_province">
                                Shipping Province
                              </InputLabel>
                              <TextField
                                placeholder="Shipping Province"
                                fullWidth
                                type="text"
                                id="shipping_province"
                                name="shipping_province"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.shipping_province || ""}
                              ></TextField>
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="shipping_country">
                                Shipping Country
                              </InputLabel>
                              <TextField
                                placeholder="Shipping Country"
                                fullWidth
                                type="text"
                                id="shipping_country"
                                name="shipping_country"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.shipping_country || ""}
                              ></TextField>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      spacing={2}
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
                        Update
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditAccount;
