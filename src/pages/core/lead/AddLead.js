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
} from "@mui/material";

// project import
import { Formik } from "formik";
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";
import useScriptRef from "../../../hooks/useScriptRef";

import {
  getDecisionTimeframes,
  getLeadSources,
  getLeadStatuss,
  getProductInterests,
  getIndustries,
  getEmployees,
} from "../../../store/reducers/masterData";

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddNewAccount() {
  const history = useNavigate();
  const dispatch = useDispatch();
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
  }, []);

  const handleCancel = () => {
    history(`/lead/list`);
  };

  return (
    <>
      <Formik
        initialValues={{}}
        enableReinitialize
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
            const token = JSON.parse(localStorage.getItem("token"));
            const header = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            await axios.post(`/api/lead`, values, header).then(
              (data) => {
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Create Lead Success",
                    variant: "alert",
                    alert: {
                      color: "success",
                    },
                    close: false,
                  })
                );

                history(`/lead/view/${data.data[0].id}`);
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
            <MainCard title="Add new Lead">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <MainCard>
                    <Grid container spacing={1} direction="column">
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="firstname">
                            First Name
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="firstname"
                            placeholder="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="firstname"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="middlename">
                            Middle Name
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="middlename"
                            placeholder="Middle Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="middlename"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="name">Last Name</InputLabel>
                          <TextField
                            fullWidth
                            id="lastname"
                            placeholder="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="lastname"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="site">Company</InputLabel>
                          <TextField
                            fullWidth
                            id="company"
                            placeholder="Site"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="company"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <TextField
                            fullWidth
                            id="email"
                            placeholder="Email@domain.com"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="email"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="phone">Phone</InputLabel>
                          <TextField
                            fullWidth
                            id="phone"
                            placeholder="Phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="phone"
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="mobile_phone">
                            Mobile Phone
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="mobile_phone"
                            placeholder="Mobile Phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="mobile_phone"
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="employees">Employees</InputLabel>
                          <TextField
                            placeholder="Choose Employees"
                            fullWidth
                            select
                            id="employees"
                            name="employees"
                            onChange={handleChange}
                            defaultValue=""
                          >
                            {employees.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="industry">Industry</InputLabel>
                          <TextField
                            placeholder="Choose industry"
                            fullWidth
                            select
                            id="industry"
                            name="industry"
                            onChange={handleChange}
                            defaultValue=""
                          >
                            {industries.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="description">
                            Description
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="description"
                            placeholder="Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="description"
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="lead_source">
                            Lead Source
                          </InputLabel>
                          <TextField
                            placeholder="Choose Source"
                            fullWidth
                            select
                            id="lead_source"
                            name="lead_source"
                            onChange={handleChange}
                            defaultValue=""
                          >
                            {leadSources.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="lead_status">
                            Lead Status
                          </InputLabel>
                          <TextField
                            placeholder="Choose Status"
                            fullWidth
                            select
                            id="lead_status"
                            name="lead_status"
                            onChange={handleChange}
                            defaultValue=""
                          >
                            {leadStatuss.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="product_interest">
                            Product Interest
                          </InputLabel>
                          <TextField
                            placeholder="Choose Product Interest"
                            fullWidth
                            select
                            id="product_interest"
                            name="product_interest"
                            onChange={handleChange}
                            defaultValue=""
                          >
                            {productInterests.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
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

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="title">Title</InputLabel>
                          <TextField
                            placeholder="Title"
                            fullWidth
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="annual_revenue">
                            Annual Revenue
                          </InputLabel>
                          <TextField
                            placeholder="Annual Revenue"
                            fullWidth
                            type="number"
                            id="annual_revenue"
                            name="annual_revenue"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="object">Object</InputLabel>
                          <TextField
                            placeholder="Object"
                            fullWidth
                            type="text"
                            id="object"
                            name="object"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MainCard>
                    <Grid container spacing={1} direction="column">
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="street">Street</InputLabel>
                          <TextField
                            placeholder="Street"
                            fullWidth
                            type="text"
                            id="street"
                            name="street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="city">City</InputLabel>
                          <TextField
                            placeholder="City"
                            fullWidth
                            type="text"
                            id="city"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="province">Province</InputLabel>
                          <TextField
                            placeholder="Province"
                            fullWidth
                            type="text"
                            id="province"
                            name="province"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="country">Country</InputLabel>
                          <TextField
                            placeholder="Country"
                            fullWidth
                            type="text"
                            id="country"
                            name="country"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="decision_timeframe">
                            Decision Timeframe
                          </InputLabel>
                          <TextField
                            placeholder="Choose Decision Timeframe"
                            fullWidth
                            select
                            id="decision_timeframe"
                            name="decision_timeframe"
                            onChange={handleChange}
                            defaultValue=""
                          >
                            {decisionTimeframes.map((option) => (
                              <MenuItem key={option.id} value={option.code}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="decision_maker">
                            Decision Maker
                          </InputLabel>
                          <TextField
                            placeholder="Decision Maker"
                            fullWidth
                            type="checkbox"
                            id="decision_maker"
                            name="decision_maker"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="project_defined">
                            Project Defined
                          </InputLabel>
                          <TextField
                            placeholder="Project Defined"
                            fullWidth
                            type="checkbox"
                            id="project_defined"
                            name="project_defined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="has_budget">
                            Has Budget
                          </InputLabel>
                          <TextField
                            fullWidth
                            type="checkbox"
                            id="has_budget"
                            name="has_budget"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="dead_comment_of_sales">
                            Dead comment of sales
                          </InputLabel>
                          <TextField
                            fullWidth
                            type="checkbox"
                            id="dead_comment_of_sales"
                            name="dead_comment_of_sales"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="bantos">BANTOS</InputLabel>
                          <TextField
                            fullWidth
                            type="checkbox"
                            id="bantos"
                            name="bantos"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="do_not_call">
                            Do not call
                          </InputLabel>
                          <TextField
                            fullWidth
                            type="checkbox"
                            id="do_not_call"
                            name="do_not_call"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></TextField>
                        </Stack>
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
