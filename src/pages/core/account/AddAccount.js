import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// project import
import { Formik } from "formik";
import * as yup from "yup";
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";
import useScriptRef from "../../../hooks/useScriptRef";
import { getAccounts } from "../../../store/reducers/account";
import {
  getAccountTypes,
  getIndustries,
  getEmployees,
} from "../../../store/reducers/masterData";
import useAuth from "../../../hooks/useAuth";

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddNewAccount() {
  const history = useNavigate();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const { accountTypes, employees, industries } = useSelector(
    (state) => state.masterData
  );
  const { accounts } = useSelector((state) => state.account);
  const [show, setShow] = useState(false);
  const [isPersonAccountState, setIsPersonAccountState] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [authState, authDispatch] = useAuth();
  const [defaultAccountType, setDefaultAccountType] = useState("");
  const [seletedAccountType, setSeletedAccountType] = useState("");
  const [defaultYearStarted, setDefaultYearStarted] = useState(
    dayjs("2022-04-07")
  );

  useEffect(() => {
    dispatch(getAccountTypes());
    dispatch(getIndustries());
    dispatch(getEmployees());
    dispatch(getAccounts());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accounts) {
      setAccountData(accounts);
    }
  }, [accounts]);

  useEffect(() => {
    if (accountTypes.length > 0) {
      setDefaultAccountType(accountTypes[0].code);
    }
  }, [accountTypes]);

  const handleCancel = () => {
    history(`/account/list`);
  };

  const onSelectChange = (e) => {
    const isPersonAccount = accountTypes.find(
      (a) => a.code === e.target.value
    ).is_person_account;

    const code = accountTypes.find((a) => a.code === e.target.value).code;

    setShow(isPersonAccount);
    setIsPersonAccountState(isPersonAccount);
    setSeletedAccountType(code);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          type: defaultAccountType,
          name: "",
          site: "",
          accountsource: "",
          phone: "",
          mobile_phone: "",
          tax_code: "",
          description: "",
          identity_card: "",
        }}
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
          tax_code: isPersonAccountState
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
            validate(values);
            console.log(values);
            const token = JSON.parse(localStorage.getItem("token"));
            const header = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            await axios.post(`/api/account`, values, header).then(
              (data) => {
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Create Account Success",
                    variant: "alert",
                    alert: {
                      color: "success",
                    },
                    close: false,
                  })
                );

                history(`/account/view/${data.data[0].id}`);
              },
              (err) => {
                setStatus({ success: false });
                setErrors({ submit: err.error.message || err.message });
                setSubmitting(false);
                dispatch(
                  openSnackbar({
                    open: true,
                    message:
                      err.error.details || err.error.message || err.message,
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
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
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
            <MainCard title="Add new Account">
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
                            value={seletedAccountType || defaultAccountType}
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
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
                          <Typography>{authState.user.username}</Typography>
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue=""
                                error={Boolean(
                                  touched.identity_card && errors.identity_card
                                )}
                                helperText={
                                  touched.identity_card && errors.identity_card
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue=""
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue=""
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
                          {" "}
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
                          <InputLabel htmlFor="employees">Employees</InputLabel>
                          <TextField
                            placeholder="Choose Employees"
                            fullWidth
                            select
                            id="employees"
                            name="employees"
                            onChange={handleChange}
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
                      Add
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AddNewAccount;
