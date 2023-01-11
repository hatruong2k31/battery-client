import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// material-ui
import {
  Grid,
  InputLabel,
  TextField,
  Stack,
  Button,
  MenuItem
} from "@mui/material";

// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getUser } from "../../../store/reducers/user";
import { getRoles } from "../../../store/reducers/role";
import { Formik } from "formik";
import { openSnackbar } from "../../../store/reducers/snackbar";
import useScriptRef from "../../../hooks/useScriptRef";
import axios from "../../../utils/axios";

const EditAccount = () => {
  const { id } = useParams();
  const scriptedRef = useScriptRef();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getRoles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleCancel = () => {
    history(`/system-config/users`);
  };
  return (
    <>
      {user && user.id === Number(id) && (
        <Formik
        initialValues={user}
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

            await axios.put(`/api/guser/detail/${id}`, values, header).then(
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
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MainCard>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Email</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter product name"
                        fullWidth
                        // onChange={handleChange}
                        value={user.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Username</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter name"
                        fullWidth
                        onChange={handleChange}
                        defaultValue={user.username}
                        name="username"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Name</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter product name"
                        fullWidth
                        onChange={handleChange}
                        defaultValue={user.name}
                        name="name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Phone</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter phone"
                        fullWidth
                        onChange={handleChange}
                        defaultValue={user.phone}
                        name="phone"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Adress</InputLabel>
                      <TextField
                        sx={{ "& .MuiOutlinedInput-input": { opacity: 1 } }}
                        placeholder="Enter address"
                        fullWidth
                        onChange={handleChange}
                        defaultValue={user.address}
                        name="address"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ mb: 1, opacity: 1 }}>Role</InputLabel>
                      <TextField
                          placeholder="Choose Role"
                          fullWidth
                          select
                          defaultValue={user.role_id}
                          name="role_id"
                          onChange={handleChange}
                          id="rold_id"
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
                        Update
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
      )}
    </>
  );
};

export default EditAccount;
