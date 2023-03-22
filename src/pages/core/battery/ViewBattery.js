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
                    <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      value={user.email}
                      name="email"
                      readOnly
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Username</InputLabel>
                    <OutlinedInput
                      id="username"
                      type="text"
                      value={user.username}
                      name="username"
                      placeholder="Enter your Username"
                      readOnly
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                    <OutlinedInput
                      id="phone"
                      type="text"
                      value={user.phone}
                      name="phone"
                      placeholder="Enter your Phone"
                      readOnly
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Identity Card</InputLabel>
                    <OutlinedInput
                      id="identity_card"
                      type="text"
                      value={user.identity_card}
                      name="identity_card"
                      placeholder="Enter your Identity"
                      readOnly
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>RFID</InputLabel>
                    <OutlinedInput
                      id="card_id"
                      type="text"
                      value={user.card_id}
                      name="card_id"
                      placeholder="Enter RFID"
                      readOnly
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Provicer</InputLabel>
                    <OutlinedInput
                      id="provider"
                      type="text"
                      value={user.provider}
                      name="provider"
                      placeholder="Enter Provicer"
                      readOnly
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Balance</InputLabel>
                    <OutlinedInput
                      id="balance"
                      type="number"
                      value={user.balance}
                      name="balance"
                      placeholder="Enter Balance"
                      readOnly
                      fullWidth
                    />
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
                justifyContent="center"
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
