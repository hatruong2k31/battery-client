import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Grid,
  TextField,
  Button,
  Stack,
} from "@mui/material";

// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getUser } from "../../../store/reducers/user";

const ViewUser = () => {
  const history = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUser(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    history(`/system-config/users`);
  };

  return (
    <>
      {user && user.id === Number(id) && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="standard-email"
                    label="Email"
                    variant="standard"
                    value={user.email}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="standard-username"
                    label="Username"
                    variant="standard"
                    value={user.username}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="standard-name"
                    label="Name"
                    variant="standard"
                    value={user.name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="standard-phone"
                    label="Phone"
                    variant="standard"
                    value={user.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="standard-basic"
                    label="Role"
                    variant="standard"
                    value={user.role_id}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="standard-basic"
                    label="Id card"
                    variant="standard"
                    value={user.id_card}
                  />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="right"
              alignItems="right"
              sx={{ mt: 6 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Back
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewUser;
