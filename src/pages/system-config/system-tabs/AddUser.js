import { useNavigate } from "react-router-dom";
// material-ui
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  MenuItem
} from "@mui/material";
// project import
import { Formik } from "formik";
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";
import useScriptRef from "../../../hooks/useScriptRef";
import { getRoles } from "../../../store/reducers/role";
import { useEffect } from "react";

// assets

function AddNewUser() {
  const history = useNavigate();
  const scriptedRef = useScriptRef();
  const { roles } = useSelector((state) => state.role);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getRoles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/system-config/users`);
  };

  return (
    <>
      <Formik
        initialValues={{}}
        enableReinitialize
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            values.org.email = values.auth.email;
            console.log(values);
            const token = JSON.parse(localStorage.getItem("token"));
            const header = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            await axios.post(`/api/guser`, values, header).then(
              (data) => {
                dispatch(
                  openSnackbar({
                    open: true,
                    message: "Create User Success",
                    variant: "alert",
                    alert: {
                      color: "success",
                    },
                    close: false,
                  })
                );
                history(`/system-config/users-view/${data.id}`);
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
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MainCard title="Add new User">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Email</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter email"
                        fullWidth
                        onChange={handleChange}
                        name="auth.email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Username</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter name"
                        fullWidth
                        onChange={handleChange}
                        name="auth.username"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Password</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter password"
                        fullWidth
                        onChange={handleChange}
                        name="auth.password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Name</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter product name"
                        fullWidth
                        onChange={handleChange}
                        name="org.name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Phone</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter phone"
                        fullWidth
                        onChange={handleChange}
                        name="org.phone"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Adress</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter address"
                        fullWidth
                        onChange={handleChange}
                        name="org.address"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Role</InputLabel>
                      <TextField
                            placeholder="Choose Role"
                            fullWidth
                            select
                            id="auth.profile_id"
                            name="auth.profile_id"
                            onChange={handleChange}
                          >
                            {roles.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
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
                        Add
                      </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AddNewUser;
