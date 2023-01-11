import { useEffect } from "react";
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
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getContact } from "../../../store/reducers/contact";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { del } from "../../../utils/request";
const ViewContact = () => {
  const history = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { contact } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getContact(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    history(`/contact/list`);
  };

  return (
    <>
      {contact && contact.data[0].id === Number(id) && (
        <MainCard title="View Contact">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ p: 0, pb: 0 }}
            spacing={1}
          >
            <Button
              variant="contained"
              onClick={() => {
                history(`/contact/edit/${contact.data[0].id}`);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                if (
                  !window.confirm(
                    `Are you sure you want to delete ${contact.data[0].lastname}`
                  )
                ) {
                  return;
                }
                del(`/api/contact/${contact.data[0].id}`).then((response) => {
                  if (response.status === 200) {
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: "Delete Success",
                        variant: "alert",
                        alert: {
                          color: "success",
                        },
                        close: false,
                      })
                    );
                    history(`/contact/list`);
                  } else {
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: `Delete Error! ${response?.message}`,
                        variant: "alert",
                        alert: {
                          color: "error",
                        },
                        close: false,
                      })
                    );
                  }
                });
              }}
            >
              Delete
            </Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MainCard title="Contact information">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>First Name</InputLabel>
                    <OutlinedInput
                      id="firstname"
                      type="text"
                      value={contact.data[0]?.firstname}
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
                      value={contact.data[0]?.middlename}
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
                      value={contact.data[0]?.lastname}
                      name="lastname"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>
                      Identity Card
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ color: `error.main` }}
                      >
                        *
                      </Typography>
                    </InputLabel>
                    <OutlinedInput
                      id="identity_card"
                      type="text"
                      value={contact.data[0]?.identity_card}
                      name="identity_card"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>BirthDate</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack>
                        <DatePicker
                          readOnly
                          id="birthdate"
                          value={contact.data[0]?.birthdate}
                          name="birthdate"
                          closeOnSelect
                          inputFormat="DD/MM/YYYY"
                          renderInput={(params) => <TextField {...params} />}
                          mask="__/__/____"
                          fullWidth
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Gender</InputLabel>
                    <TextField
                      name="gender"
                      id="gender"
                      fullWidth
                      readOnly
                      defaultValue={contact.data[0]?.gender || "0"}
                      variant="outlined"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Mobile Phone</InputLabel>
                    <OutlinedInput
                      id="mobile_phone"
                      type="text"
                      value={contact.data[0]?.mobile_phone}
                      name="mobile_phone"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                    <OutlinedInput
                      id="phone"
                      type="text"
                      value={contact.data[0]?.phone}
                      name="phone"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Home Phone</InputLabel>
                    <OutlinedInput
                      id="homephone"
                      type="text"
                      value={contact.data[0]?.homephone}
                      name="homephone"
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
                      value={contact.data[0]?.email}
                      name="email"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Title</InputLabel>
                    <OutlinedInput
                      id="title"
                      type="text"
                      value={contact.data[0]?.title}
                      name="title"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Department</InputLabel>
                    <OutlinedInput
                      id="department"
                      type="text"
                      value={contact.data[0]?.department}
                      name="department"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel sx={{ mb: 1 }}>Account Name - Email</InputLabel>
                    <TextField
                      name="account_name"
                      id="account_name"
                      fullWidth
                      readOnly
                      defaultValue={contact.data[0]?.account_name || ""}
                      variant="outlined"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel sx={{ mb: 1 }}>Description</InputLabel>
                    <OutlinedInput
                      id="description"
                      type="text"
                      value={contact.data[0]?.description}
                      name="description"
                      rows={2}
                      multiline
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        contact.data[0]?.donotcall ? (
                          <Checkbox defaultChecked value={true} />
                        ) : (
                          <Checkbox value={true} />
                        )
                      }
                      label="Do not call"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mt: 1 }}>
                      Contact Owner : {contact.data[0]?.owner_name}
                    </InputLabel>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Create By Name
                            </InputLabel>
                            <OutlinedInput
                              readOnly
                              id="created_by_name"
                              type="text"
                              value={contact.data[0]?.created_by_name}
                              name="created_by_name"
                              fullWidth readOnly
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Update By Name
                            </InputLabel>
                            <OutlinedInput
                              readOnly
                              id="updated_by_name"
                              type="text"
                              value={contact.data[0]?.updated_by_name}
                              name="updated_by_name"
                              fullWidth readOnly
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Create At</InputLabel>
                            <OutlinedInput
                              readOnly
                              id="created_at"
                              type="text"
                              value={contact.data[0]?.created_at
                                ?.replace("T", " ")
                                ?.slice(0, 19)}
                              name="created_at"
                              fullWidth readOnly
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>Update At</InputLabel>
                            <TextField
                              readOnly
                              id="updated_at"
                              type="text"
                              value={contact.data[0]?.updated_at
                                ?.replace("T", " ")
                                ?.slice(0, 19)}
                              name="updated_at"
                              fullWidth readOnly
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel sx={{ mb: 1 }}>
                              Convert From Lead Name
                            </InputLabel>
                            <OutlinedInput
                              readOnly
                              id="convert_from_lead_name"
                              type="text"
                              value={contact.data[0]?.convert_from_lead_name}
                              name="convert_from_lead_name"
                              fullWidth readOnly
                            />
                          </Grid> */}
                </Grid>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard title="Address information">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Street</InputLabel>
                    <OutlinedInput
                      id="street"
                      type="text"
                      value={contact.data[0]?.street}
                      name="street"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>City</InputLabel>
                    <OutlinedInput
                      id="city"
                      type="text"
                      value={contact.data[0]?.city}
                      name="city"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Province</InputLabel>
                    <OutlinedInput
                      id="province"
                      type="text"
                      value={contact.data[0]?.province}
                      name="address"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Country</InputLabel>
                    <OutlinedInput
                      id="country"
                      type="text"
                      value={contact.data[0]?.country}
                      name="country"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ mt: 6 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              {/* <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button> */}
            </Stack>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default ViewContact;
