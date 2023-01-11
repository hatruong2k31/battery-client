import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// material-ui
import {
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";

// third-party
// import { NumericFormat as NumberFormat } from "react-number-format";

// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getOpportunity } from "../../../store/reducers/opportunity";
import { getUsers } from "../../../store/reducers/user";

const ViewAccount = () => {
  const history = useNavigate();
  const { id } = useParams();
  const { opportunity } = useSelector((state) => state.opportunity);
  const { users } = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(users){
      dispatch(getOpportunity(id));
      if (opportunity) {
        const isShow = users.find(
          (a) => a.id === opportunity.owner_id).username;

          setUsername(isShow);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleCancel = () => {
    history(`/opportunity/list`);
  };

  return (
    <>
      {users && opportunity && opportunity.id === Number(id) && (
        <MainCard title="View Account">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MainCard>
                <Grid container spacing={1} direction="column">
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Opportunity Name</Typography>
                      <Typography>{opportunity.name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Opportunity Owner</Typography>
                      <Typography>{username}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Account Name</Typography>
                      <Typography>{opportunity.account_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Type</Typography>
                      <Typography>
                        {opportunity.record_type}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Stage</Typography>
                      <Typography>
                        {opportunity.stage_name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Email</Typography>
                      <Typography>
                        {opportunity.email}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Close Date</Typography>
                      <Typography>
                        {opportunity.close_date}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Probability (%)</Typography>
                      <Typography>{opportunity.description} %</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Loss Reason</Typography>
                      <Typography>{opportunity.loss_reason}</Typography>
                    </Stack>
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
                      <Button variant="contained">
                        Edit
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default ViewAccount;
