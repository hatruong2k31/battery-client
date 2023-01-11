import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Grid, Stack, Typography, Button } from "@mui/material";

// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getDetailTask } from "../../../store/reducers/task";

const ViewTask = () => {
  const history = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getDetailTask(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    history(`/task/list`);
  };

  const handleEdit = () => {
    history(`/task/edit/${id}`);
  };

  return (
    <>
      {task && task[0].id === Number(id) && (
        <MainCard title="View task">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MainCard>
                <Grid container spacing={1} direction="column">
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Subject</Typography>
                      <Typography>{task[0].subject}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Due Date</Typography>
                      <Typography>{task[0].completed_date_time.substring(0, 10)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Assigned To</Typography>
                      <Typography>{task[0].assigned_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Name</Typography>
                      <Typography>{task[0].lead_name==null?task[0].contact_name:task[0].lead_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Priority</Typography>
                      <Typography>{task[0].priority}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Status</Typography>
                      <Typography>{task[0].status}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Related To(Account)</Typography>
                      <Typography>{task[0].related_account_name}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Comment</Typography>
                      <Typography>{task[0].description}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Created By Name</Typography>
                      <Typography>{task[0].created_by_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Created At</Typography>
                      <Typography>{task[0].created_at}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Updated By Name</Typography>
                      <Typography>{task[0].updated_by_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Updated At</Typography>
                      <Typography>{task[0].updated_at}</Typography>
                    </Stack>
                  </Grid>
                 
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Rating</Typography>
                      <Typography>{task[0].rating}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Owner Name</Typography>
                      <Typography>{task[0].owner_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Created by name</Typography>
                      <Typography>{task[0].created_by_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Created at</Typography>
                      <Typography>{task[0].created_at}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Updated by name</Typography>
                      <Typography>{task[0].updated_by_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Updated at</Typography>
                      <Typography>{task[0].updated_at}</Typography>
                    </Stack>
                  </Grid>
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
                    <Button variant="contained" onClick={handleEdit}>
                      Edit
                    </Button>
                  </Stack>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default ViewTask;
