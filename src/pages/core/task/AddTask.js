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
import {
  getUser
} from "../../../store/reducers/user";
import { getLeads } from "../../../store/reducers/lead";
import { getAccounts } from "../../../store/reducers/account";

// project import
import { Formik } from "formik";
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

function AddTask() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleCancel = () => {
    history(`/task/list`);
  };
  const { users } = useSelector((state) => state.user);
  const { leads } = useSelector((state) => state.lead);
  const { accounts } = useSelector((state) => state.account)
  // const { contacts } = useSelector((state) => state.contact);
  useEffect(() => {
    dispatch(getUser());
    dispatch(getLeads());
    dispatch(getAccounts());
  })

  return (
    <>
      <Formik
        initialValues={{}}
        enableReinitialize
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log('ada',leads);
            const token = JSON.parse(localStorage.getItem("token"));
            const header = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            await axios.post(`/api/task`, values, header).then(
              (data) => {
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Create Task Success",
                    variant: "alert",
                    alert: {
                      color: "success",
                    },
                    close: false,
                  })
                );

                history(`/task/view/${data.data[0].id}`);
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
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard title="Add new Task">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel htmlFor="subject">
                        *Subject
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="subject"
                        placeholder="Subject"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel htmlFor="type" sx={{ mb: 1, opacity: 1 }}>
                        Asigned To
                      </InputLabel>
                      <TextField
                        placeholder="Choose Opportunity Owner"
                        fullWidth
                        select
                        id="assigned_to"
                        name="assigned_to"
                        onChange={handleChange}
                      >
                        {users.map((option) => (
                          <MenuItem >
                            {option.username}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Contact</InputLabel>
                      <TextField
                        placeholder="Contact"
                        fullWidth
                        
                        id="contact_id"
                        name="contact_id"
                        onChange={handleChange}
                      >
                        {users.map((option) => (
                          <MenuItem >
                            {option.username}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Lead</InputLabel>
                      <TextField
                        placeholder="Lead"
                        fullWidth
                        select
                        id="lead_id"
                        name="lead_id"
                        onChange={handleChange}
                      >
                        {leads.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>*Status</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Status"
                        fullWidth
                        onChange={handleChange}
                        name="status"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Related To Account</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter Email"
                        fullWidth
                        // select
                        onChange={handleChange}
                        name="related_to_account_id"
                        id="related_to_account_id"
                      >
                        {/* {accounts.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))} */}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }} htmlFor="birthdate">Due Date</InputLabel>
                      <TextField
                        placeholder="Close Date"
                        fullWidth
                        type="date"
                        id="completed_date_time"
                        name="completed_date_time"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Related To Opportunity</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter Probability"
                        fullWidth
                        onChange={handleChange}
                        name="related_to_opp_id"
                        id="related_to_opp_id"
                        // select
                        min="0"
                        max="100"
                      >
                        {/* {accounts.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))} */}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Priority</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter Description"
                        fullWidth
                        onChange={handleChange}
                        name="description"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Comment</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter Comment"
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

export default AddTask;
