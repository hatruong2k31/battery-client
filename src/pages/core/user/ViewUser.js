import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Grid, Stack, Button, OutlinedInput, InputLabel } from "@mui/material";
// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getUser } from "../../../store/reducers/user";
// import { openSnackbar } from "../../../store/reducers/snackbar";
import { get, del } from "../../../utils/request";

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
  /* <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ p: 0, pb: 0 }}
            spacing={1}
          ></Stack> */

  return (
    <>
      {user && user.id === Number(id) && (
        <Grid container>
          <MainCard title="View User Infomation">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <InputLabel sx={{ mb: 1 }}>Provider</InputLabel>
                <OutlinedInput
                  id="provider"
                  type="text"
                  value={user.provider}
                  name="provider"
                  readOnly
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={8}>
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
                  placeholder="Enter phone"
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
                  placeholder="Enter Identity"
                  readOnly
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel sx={{ mb: 1 }}>RFID</InputLabel>
                <OutlinedInput
                  id="card_id"
                  type="text"
                  value={user.card_id}
                  name="card_id"
                  placeholder="Enter RFID"
                  fullWidth
                  readOnly={false}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel sx={{ mb: 1 }}>Balance</InputLabel>
                <OutlinedInput
                  id="balance"
                  type="number"
                  value={user.balance}
                  name="balance"
                  placeholder="Enter balance"
                  readOnly={false}
                  fullWidth
                />
              </Grid>
            </Grid>
          </MainCard>
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
      )}
    </>
  );
};

export default ViewUser;
