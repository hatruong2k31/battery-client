import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// material-ui
import { Grid, Stack, InputLabel, Button, TextField, MenuItem } from "@mui/material";

// project imports
import { Formik } from "formik";
import useScriptRef from "../../../hooks/useScriptRef";
import { useDispatch, useSelector } from "../../../store";
import { getOpportunity } from "../../../store/reducers/opportunity";
import MainCard from "../../../components/MainCard";
import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { getUsers } from "../../../store/reducers/user";
import { DatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const EditOpportunity = () => {
  const { id } = useParams();
  const scriptedRef = useScriptRef();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { opportunity } = useSelector((state) => state.opportunity);
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getOpportunity(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleCancel = () => {
    history(`/opportunity/list`);
  };
  return (
    <>
    {opportunity && opportunity.id === Number(id) && (
        <Formik
        initialValues={opportunity}
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

            await axios.put(`/api/opportunity/detail/${id}`, values, header).then(
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
          handleChange,
          handleSubmit,
          isSubmitting,
          handleBlur,
          setFieldValue,
          values,
        }) => (
          
          <form noValidate onSubmit={handleSubmit}>
            <MainCard title='Edit Opportunity' >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Opportunity Name</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter product name"
                        fullWidth
                        onChange={handleChange}
                        defaultValue={opportunity.name}
                        name="name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Opportunity Owner</InputLabel>
                      <TextField
                            placeholder="Choose Opportunity Owner"
                            fullWidth
                            select
                            id="owner_id"
                            name="owner_id"
                            onChange={handleChange}
                            defaultValue={opportunity.owner_id || ""}
                          >
                            {users.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.username}
                              </MenuItem>
                            ))}
                          </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{  mb: 1, opacity: 1 }}>Account Name</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter Account name"
                        fullWidth
                        onChange={handleChange}
                        defaultValue={opportunity.account_name}
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
                        defaultValue={opportunity.record_type}
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
                        defaultValue={opportunity.stage_name}
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
                        defaultValue={opportunity.email}
                        name="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }} htmlFor="birthdate">Close Date</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        hideTabs
                        value={values.close_date}
                        onChange={(value) => {
                            setFieldValue('close_date', Date.parse(value));
                        }}
                        renderInput={(params) => <TextField {...params}/>}
                        inputFormat="DD/MM/YYYY"
                        mask="__/__/____"
                        name="close_date"
                      />
                    </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Probability (%)</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter Probability"
                        fullWidth
                        onChange={handleChange}
                        defaultValue={opportunity.probability}
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
                        defaultValue={opportunity.description}
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
                        defaultValue={opportunity.loss_reason}
                        name="loss_reason"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="right"
                        alignItems="center"
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

export default EditOpportunity;
