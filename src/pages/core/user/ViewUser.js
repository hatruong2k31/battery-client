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
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getUser } from "../../../store/reducers/user";
// import { openSnackbar } from "../../../store/reducers/snackbar";
import { get, put, del } from "../../../utils/request";

const ViewUser = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    get(`/api/user/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return setUser(response.data);
        }
      })
      .catch((error) => {
        return error;
      });
  }, [id]);

  const handleCancel = () => {
    history(`/user/list`);
  };

  return (
    <>
      {user && user.id === Number(id) && (
        <MainCard title="View User">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ p: 0, pb: 0 }}
            spacing={1}
          ></Stack>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MainCard title="User information">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>First Name</InputLabel>
                    <OutlinedInput
                      id="firstname"
                      type="text"
                      value={user?.firstname}
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
                      value={user?.middlename}
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
                      value={user?.lastname}
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
                      value={user?.identity_card}
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
                          value={user?.birthdate}
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
                      value={user?.mobile_phone}
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
                      value={user?.phone}
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
                      value={user?.homephone}
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
                      value={user?.email}
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
                      value={user?.title}
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
                      value={user?.department}
                      name="department"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel sx={{ mb: 1 }}>
                      Account Name
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ color: `error.main` }}
                      >
                        *
                      </Typography>
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel sx={{ mb: 1 }}>Description</InputLabel>
                    <OutlinedInput
                      id="description"
                      type="text"
                      value={user?.description}
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
                        user?.donotcall ? (
                          <Checkbox defaultChecked value={true} />
                        ) : (
                          <Checkbox value={true} />
                        )
                      }
                      onClick="return false;"
                      label="Do not call"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mt: 1 }}>
                      User Owner :
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ fontWeight: 1000, fontSize: 15 }}
                      >
                        {" " + user?.owner_name}
                      </Typography>
                    </InputLabel>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard title="Address information">
                <Grid container spacing={2}></Grid>
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
                    history(`/user/edit/${user.id}`);
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

export default ViewUser;
