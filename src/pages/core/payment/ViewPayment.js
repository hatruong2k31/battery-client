import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Stack,
  Button,
  OutlinedInput,
  InputLabel,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  MenuItem,
} from "@mui/material";

// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getPayment } from "../../../store/reducers/payment";
// import { openSnackbar } from "../../../store/reducers/snackbar";

import { selectProvince, selectDistrict } from "../../../utils/selectRequest";
// import { put, del } from "../../../utils/request";
const ViewPayment = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const countries = [{ id: "01", name: "Việt Nam" }];
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.payment);
  const {
    employees,
    industries,
    decisionTimeframes,
    productInterests,
    paymentSources,
    paymentStatuss,
  } = useSelector((state) => state.masterData);

  useEffect(() => {
    dispatch(getPayment(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (payment && payment.id === Number(id)) {
      selectProvince(payment?.country).then((response) =>
        setProvinces(response.data)
      );
      selectDistrict(payment?.province).then((response) =>
        setDistricts(response.data)
      );
    }
  }, [payment]);

  const handleCancel = () => {
    history(`/payment/list`);
  };

  return (
    <>
      {payment && payment.id === Number(id) && (
        <MainCard title="View Payment">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MainCard title="Payment information">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>First Name</InputLabel>
                    <OutlinedInput
                      id="firstname"
                      type="text"
                      value={payment?.firstname}
                      name="firstname"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Middle Name</InputLabel>
                    <OutlinedInput
                      id="middlename"
                      type="text"
                      value={payment?.middlename}
                      name="middlename"
                      fullWidth
                      readOnly
                    />
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
                      value={payment?.lastname}
                      name="lastname"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Title</InputLabel>
                    <OutlinedInput
                      id="title"
                      type="text"
                      value={payment?.title}
                      name="title"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Company</InputLabel>
                    <OutlinedInput
                      id="company"
                      type="text"
                      value={payment?.company}
                      name="company"
                      fullWidth
                      readOnly
                    />
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
                      value={payment?.website}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                    <OutlinedInput
                      id="phone"
                      type="text"
                      value={payment?.phone}
                      name="phone"
                      fullWidth
                      readOnly
                    />
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
                      value={payment?.mobile_phone}
                      name="mobile_phone"
                      fullWidth
                      readOnly
                    />
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
                      value={payment?.email}
                      name="email"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }} htmlFor="annual_revenue">
                      Annual Revenue
                    </InputLabel>
                    <OutlinedInput
                      id="annual_revenue"
                      type="number"
                      value={payment?.annual_revenue}
                      name="annual_revenue"
                      // InputProps={{ inputProps: { min: 0 } }}

                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }} htmlFor="payment_source">
                      Payment Source
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
                      id="payment_source"
                      name="payment_source"
                      defaultValue={payment?.payment_source || ""}
                      inputProps={{ readOnly: true }}
                    >
                      {paymentSources.map((option) => (
                        <MenuItem key={option.id} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }} htmlFor="payment_status">
                      Payment Status
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
                      id="payment_status"
                      name="payment_status"
                      defaultValue={payment?.payment_status || ""}
                      inputProps={{ readOnly: true }}
                    >
                      {paymentStatuss.map((option) => (
                        <MenuItem key={option.id} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }} htmlFor="number_of_employees">
                      Employees
                    </InputLabel>
                    <TextField
                      placeholder="Choose Employees"
                      fullWidth
                      select
                      id="number_of_employees"
                      name="number_of_employees"
                      defaultValue={payment?.number_of_employees || ""}
                      inputProps={{ readOnly: true }}
                    >
                      {employees.map((option) => (
                        <MenuItem key={option.id} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
                      defaultValue={payment?.industry || ""}
                      inputProps={{ readOnly: true }}
                    >
                      {industries.map((option) => (
                        <MenuItem key={option.id} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel sx={{ mb: 1 }}>Description</InputLabel>
                    <OutlinedInput
                      id="description"
                      type="text"
                      value={payment?.description}
                      name="description"
                      rows={2}
                      multiline
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mt: 1 }}>
                      Payment Owner :
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ fontWeight: 1000, fontSize: 15 }}
                      >
                        {" " + payment?.owner_name}
                      </Typography>
                    </InputLabel>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard title="Address Infomation">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Country</InputLabel>
                    <TextField
                      name="country"
                      select
                      id="country"
                      placeholder="Select Country"
                      fullWidth
                      inputProps={{ readOnly: true }}
                      defaultValue={payment?.country || "1"}
                      variant="outlined"
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
                      inputProps={{ readOnly: true }}
                      defaultValue={payment?.province || ""}
                      variant="outlined"
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
                      name="district"
                      select
                      id="district"
                      placeholder="Select District"
                      fullWidth
                      inputProps={{ readOnly: true }}
                      defaultValue={payment?.district || ""}
                      variant="outlined"
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
                              inputProps={{ readOnly: true }}
                              defaultValue={payment?.ward|| ""}
                              variant="outlined"
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
                      value={payment?.street}
                      name="street"
                      fullWidth
                      readOnly
                    />
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
                      defaultValue={payment?.product_interest || ""}
                      inputProps={{ readOnly: true }}
                    >
                      {productInterests.map((option) => (
                        <MenuItem key={option.id} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }} htmlFor="decision_timeframe">
                      Decision Timeframe
                    </InputLabel>
                    <TextField
                      placeholder="Choose Decision Timeframe"
                      fullWidth
                      select
                      id="decision_timeframe"
                      name="decision_timeframe"
                      defaultValue={payment?.decision_timeframe || ""}
                      inputProps={{ readOnly: true }}
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
                      value={payment?.object}
                      name="object"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      label="Decision Maker"
                      control={
                        <Checkbox
                          id="decision_maker"
                          name="decision_maker"
                          defaultChecked={
                            payment?.decision_maker ? true : false
                          }
                          value={true}
                        />
                      }
                      onClick="return false;"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      label="Has Budget"
                      control={
                        <Checkbox
                          id="has_budget"
                          name="has_budget"
                          defaultChecked={payment?.has_budget ? true : false}
                          value={true}
                        />
                      }
                      onClick="return false;"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      label="Project Defined"
                      control={
                        <Checkbox
                          id="project_defined"
                          name="project_defined"
                          defaultChecked={
                            payment?.project_defined ? true : false
                          }
                          value={true}
                        />
                      }
                      onClick="return false;"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControlLabel
                      label="BANTOS"
                      control={
                        <Checkbox
                          id="bantos"
                          name="bantos"
                          defaultChecked={payment?.bantos ? true : false}
                          value={true}
                        />
                      }
                      onClick="return false;"
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
                      defaultValue={payment?.rating || ""}
                    ></OutlinedInput>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      label="Dead Comment Of Sales"
                      control={
                        <Checkbox
                          id="dead_comment_of_sales"
                          name="dead_comment_of_sales"
                          defaultChecked={
                            payment?.dead_comment_of_sales ? true : false
                          }
                          value={true}
                        />
                      }
                      onClick="return false;"
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
                  variant="contained"
                  onClick={() => {
                    history(`/payment/edit/${payment.id}`);
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default ViewPayment;
