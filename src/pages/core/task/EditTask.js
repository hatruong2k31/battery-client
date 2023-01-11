import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeads } from "../../../store/reducers/lead";
import { getAccounts } from "../../../store/reducers/account";
// material-ui
import {
  Grid,
  Stack,
  InputLabel,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

// project imports
import { Formik } from "formik";
import useScriptRef from "../../../hooks/useScriptRef";
import { useDispatch, useSelector } from "../../../store";
import { getTaskEdit } from "../../../store/reducers/task";
import MainCard from "../../../components/MainCard";

import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";

const EditTask = () => {
  const history = useNavigate();
  const { id } = useParams();
  const { accounts } = useSelector((state) => state.account)
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const { taskEdit } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTaskEdit(id));
    dispatch(getLeads());
    dispatch(getAccounts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/task/list`);
  };

  return (
    <>
      {taskEdit && taskEdit[0].id === Number(id) && (
        <Formik
          initialValues={taskEdit[0]}
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

              await axios.put(`/api/task/detail/${id}`, values, header).then(
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
            <MainCard title="Add new Opportunity">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel htmlFor="opportunity_name">
                        *Subject
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="subject"
                        placeholder="Subject"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        defaultValue={values.subject==null?"":values.subject}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel htmlFor="type" sx={{ mb: 1, opacity: 1 }}>
                        Asigned To
                      </InputLabel>
                      {/* <TextField
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
                      </TextField> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Contact</InputLabel>
                      {/* <TextField
                        placeholder="Contact"
                        fullWidth
                        select
                        id="contact_id"
                        name="contact_id"
                        onChange={handleChange}
                      >
                        {users.map((option) => (
                          <MenuItem >
                            {option.username}
                          </MenuItem>
                        ))}
                      </TextField> */}
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
                        defaultValue={values.status==null?"":values.status}
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
                        defaultValue={values.completed_date_time==null?"":values.completed_date_time.substring(0, 10)}
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
                        defaultValue={values.lead_name==null?"":values.lead_name}
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
                        defaultValue={values.priority==null?"":values.priority}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Comment</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter Comment"
                        fullWidth
                        onChange={handleChange}
                        name="description"
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
                      Save
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

export default EditTask;
