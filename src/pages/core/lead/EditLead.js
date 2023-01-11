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
  Dialog,
} from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
// project imports
import { Formik } from "formik";

import { useDispatch, useSelector } from "../../../store";
import { getLeadEdit } from "../../../store/reducers/lead";
import {
  getDecisionTimeframes,
  getLeadSources,
  getLeadStatuss,
  getProductInterests,
  getIndustries,
  getEmployees,
} from "../../../store/reducers/masterData";
import MainCard from "../../../components/MainCard";

import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";
import ConvertLead from "./ConvertLead";

const EditAccount = () => {
  const history = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { leadEdit } = useSelector((state) => state.lead);
  const {
    employees,
    industries,
    decisionTimeframes,
    productInterests,
    leadSources,
    leadStatuss,
  } = useSelector((state) => state.masterData);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [customer, setCustomer] = useState(null);

  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);
    if (leadEdit && !add) setCustomer(null);
  };

  useEffect(() => {
    dispatch(getDecisionTimeframes());
    dispatch(getIndustries());
    dispatch(getEmployees());
    dispatch(getLeadSources());
    dispatch(getLeadStatuss());
    dispatch(getProductInterests());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getLeadEdit(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/lead/list`);
  };

  return (
    <>
      {leadEdit && leadEdit[0].id === Number(id) && (
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 3, pb: 0 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}></Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                variant="contained"
                startIcon={<PlusOutlined />}
                onClick={(e) => {
                  setCustomer(leadEdit[0]);
                  handleAdd();
                }}
              >
                Convert Lead
              </Button>
            </Stack>
          </Stack>
          <Formik
            initialValues={leadEdit[0]}
            enableReinitialize
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                console.log(values);
                const token = JSON.parse(localStorage.getItem("token"));
                const header = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };

                await axios.put(`/api/lead/detail/${id}`, values, header).then(
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
                <MainCard title="Update Lead">
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
                                defaultValue={values.firstname || ""}
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
                                defaultValue={values.middlename || ""}
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
                                defaultValue={values.lastname || ""}
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
                                defaultValue={values.site || ""}
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
                                defaultValue={values.email || ""}
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
                                defaultValue={values.phone || ""}
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
                                defaultValue={values.mobile_phone || ""}
                              />
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
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

                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="industry">
                                Industry
                              </InputLabel>
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
                                defaultValue={values.description || ""}
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
                                defaultValue={values.lead_source || ""}
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
                                defaultValue={values.lead_status || ""}
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
                                defaultValue={values.product_interest || ""}
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
                                defaultValue={values.website || ""}
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
                                defaultValue={values.title || ""}
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
                                defaultValue={values.annual_revenue || ""}
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
                                defaultValue={values.object || ""}
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
                                defaultValue={values.street || ""}
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
                                defaultValue={values.city || ""}
                              ></TextField>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="province">
                                Province
                              </InputLabel>
                              <TextField
                                placeholder="Province"
                                fullWidth
                                type="text"
                                id="province"
                                name="province"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.province || ""}
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
                                defaultValue={values.country || ""}
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
                                defaultValue={values.decision_timeframe || ""}
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
                                defaultValue={values.decision_maker || false}
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
                                defaultValue={values.project_defined || false}
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
                                defaultValue={values.has_budget || false}
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
                                defaultValue={
                                  values.dead_comment_of_sales || false
                                }
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
                                defaultValue={values.bantos || false}
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
                                defaultValue={values.do_not_all || false}
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
                          Update
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </form>
            )}
          </Formik>
        </Stack>
      )}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}
      >
        {add && <ConvertLead customer={customer} onCancel={handleAdd} />}
      </Dialog>
    </>
  );
};

export default EditAccount;
