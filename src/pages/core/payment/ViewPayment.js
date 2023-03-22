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

// import { put, del } from "../../../utils/request";
const ViewPayment = () => {
  const history = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getPayment(id));
  }, [id, dispatch]);

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
