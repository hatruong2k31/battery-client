import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// material-ui
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import MainCard from "../../../components/MainCard";
import AnimateButton from "../../../components/@extended/AnimateButton";
// import useAuth from "../../../hooks/useAuth";
// import { logout } from "../../../store/reducers/actions";
import { get, put } from "../../../utils/request";
import { roleSelect, profileSelect } from "../../../utils/selectRequest";

// assets

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

const EditUser = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(`/`);
  };
  // const [authState, authDispatch] = useAuth();
  const { id } = useParams();
  const [roles, setRoles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    roleSelect().then((response) => {
      return setRoles(response.data);
    });
    profileSelect().then((response) => {
      return setProfiles(response.data);
    });
  }, []);

  useEffect(() => {
    get(`/api/guser/detail/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return setUser((prev) => {
            const userdata = {
              ...prev,
              email: response.data[0].email,
              username: response.data[0].username,
              name: response.data[0].username,
              phone: response.data[0].phone,
              id_card: response.data[0].id_card,
              address: response.data[0].address,
              profile_id: response.data[0].profile_id,
              role_id: response.data[0].role_id,
            };
            return userdata;
          });
        }
        if (response.status === 401) {
          // return authDispatch(logout(null)), navigate("/login");
        }
      })
      .catch((error) => {
        return error;
      });
  }, [id]);

  return (
    <>
      <Formik
        initialValues={user}
        enableReinitialize
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          username: Yup.string()
            .min(1)
            .max(255)
            .required("Username is required"),
          name: Yup.string().max(255).nullable(),
          phone: Yup.string().max(11).nullable(),
          id_card: Yup.string().max(12).nullable(),
          address: Yup.string().max(255).nullable(),
          profile_id: Yup.number().nullable(),
          role_id: Yup.number().nullable(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            put(`api/guser/detail/${id}`, values)
              .then(function (response) {
                if (response.status === 200) {
                  return (
                    setSubmitting(true),
                    setStatus({ success: true }),
                    navigate(`/user/edit/${id}`)
                  );
                } else {
                  return (
                    setSubmitting(false),
                    setStatus({ success: false }),
                    setErrors({ submit: response.error.message })
                  );
                }
              })
              .catch(function (error) {
                return (
                  setSubmitting(false),
                  setStatus({ success: false }),
                  setErrors({ submit: error.response?.data?.message })
                );
              });
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
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
            <Grid container spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MainCard title="Edit Profile">
                    <Grid container spacing={3}>
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
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email"
                          >
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel sx={{ mb: 1 }}>
                          Username
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{ color: `error.main` }}
                          >
                            *
                          </Typography>
                        </InputLabel>
                        <OutlinedInput
                          id="username"
                          type="text"
                          value={values.username}
                          name="username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your Username"
                          fullWidth
                          error={Boolean(touched.username && errors.username)}
                        />
                        {touched.username && errors.username && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-username"
                          >
                            {errors.username}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel sx={{ mb: 1 }}>Name</InputLabel>
                        <OutlinedInput
                          id="name"
                          type="text"
                          value={values.name}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          fullWidth
                          error={Boolean(touched.name && errors.name)}
                        />
                        {touched.name && errors.name && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name"
                          >
                            {errors.name}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                        <OutlinedInput
                          id="phone"
                          type="text"
                          value={values.phone}
                          name="phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your phone"
                          fullWidth
                          error={Boolean(touched.phone && errors.phone)}
                        />
                        {touched.phone && errors.phone && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-phone"
                          >
                            {errors.phone}
                          </FormHelperText>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputLabel sx={{ mb: 1 }}>ID Card</InputLabel>
                        <OutlinedInput
                          id="id_card"
                          type="text"
                          value={values.id_card}
                          name="id_card"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your ID card"
                          fullWidth
                          error={Boolean(touched.id_card && errors.id_card)}
                        />
                        {touched.id_card && errors.id_card && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-id_card"
                          >
                            {errors.id_card}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel sx={{ mb: 1 }}>Address</InputLabel>
                        <OutlinedInput
                          id="address"
                          type="text"
                          value={values.address}
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          fullWidth
                          error={Boolean(touched.address && errors.address)}
                        />
                        {touched.address && errors.address && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-address"
                          >
                            {errors.address}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel sx={{ mb: 1 }}>Role</InputLabel>
                        <TextField
                          name="role_id"
                          id="role_id"
                          placeholder="Select Role"
                          fullWidth
                          select
                          value={values.role_id || ""}
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {roles.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        {touched.role_id && errors.role_id && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-role_id"
                          >
                            {errors.role_id}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputLabel sx={{ mb: 1 }}>Profile</InputLabel>
                        <TextField
                          name="profile_id"
                          id="profile_id"
                          placeholder="Select Profile"
                          fullWidth
                          select
                          value={values.profile_id || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {profiles.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        {touched.profile_id && errors.profile_id && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-profile_id"
                          >
                            {errors.profile_id}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 6 }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <AnimateButton>
                    <Button
                      sx={{ textTransform: "none" }}
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Confirm
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditUser;
