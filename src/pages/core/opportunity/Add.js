import { useEffect } from "react";
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
import { getUsers } from "../../../store/reducers/user";
// assets

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddNewOpportunity() {
  const history = useNavigate();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  

  const handleCancel = () => {
    history(`/opportunity/list`);
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

            await axios.post(`/api/opportunity`, values, header).then(
              () => {
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Create Opportunity Success",
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
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard title="Add new Opportunity">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="opportunity_name">
                      Opportunity Name
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="opportunity_name"
                      placeholder="Opportunity Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="type" sx={{ mb: 1, opacity: 1 }}>
                        Opportunity Owner
                    </InputLabel>
                    <TextField
                      placeholder="Choose Opportunity Owner"
                      fullWidth
                      select
                      id="owner_id"
                      name="owner_id"
                      onChange={handleChange}
                    >
                      {users.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.username}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Account Name</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter Account name"
                      fullWidth
                      onChange={handleChange}
                      name="account_name"
          
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Type</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter Type"
                      fullWidth
                      onChange={handleChange}
                      name="record_type"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Stage</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter Stage"
                      fullWidth
                      onChange={handleChange}
                      name="stage_name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Email</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter Email"
                      fullWidth
                      onChange={handleChange}
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }} htmlFor="birthdate">Close Date</InputLabel>
                    <TextField
                      placeholder="Close Date"
                      fullWidth
                      type="date"
                      id="close_date"
                      name="close_date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Probability (%)</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter Probability"
                      fullWidth
                      onChange={handleChange}
                      name="probability"
                      type="number"
                      min="0"
                      max="100"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ mb: 1, opacity: 1 }}>Description</InputLabel>
                  <TextField
                    sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                    placeholder="Enter Description"
                    fullWidth
                    onChange={handleChange}
                    name="description"
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1, opacity: 1 }}>Loss Reason</InputLabel>
                    <TextField
                      sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                      placeholder="Enter Loss Reason"
                      fullWidth
                      onChange={handleChange}
                      name="loss_reason"
                    />
                  </Grid>
                </Grid>
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

export default AddNewOpportunity;
