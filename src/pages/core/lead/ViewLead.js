import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Grid, Stack, Typography, Button } from "@mui/material";

// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getLead } from "../../../store/reducers/lead";

const ViewAccount = () => {
  const history = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { lead } = useSelector((state) => state.lead);

  useEffect(() => {
    dispatch(getLead(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    history(`/lead/list`);
  };

  const handleEdit = () => {
    history(`/lead/edit/${id}`);
  };

  return (
    <>
      {lead && lead[0].id === Number(id) && (
        <MainCard title="View Lead">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MainCard>
                <Grid container spacing={1} direction="column">
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">First Name</Typography>
                      <Typography>{lead[0].first_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Middle Name</Typography>
                      <Typography>{lead[0].middle_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Last Name</Typography>
                      <Typography>{lead[0].lastname}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Company</Typography>
                      <Typography>{lead[0].company}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Email</Typography>
                      <Typography>{lead[0].email}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Phone</Typography>
                      <Typography>{lead[0].phone}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Mobile Phone</Typography>
                      <Typography>{lead[0].mobile_phone}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Employees</Typography>
                      <Typography>{lead[0].employees}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Industry</Typography>
                      <Typography>{lead[0].industry}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Description</Typography>
                      <Typography>{lead[0].description}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Lead Source</Typography>
                      <Typography>{lead[0].lead_source}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Lead Status</Typography>
                      <Typography>{lead[0].lead_status}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">
                        Product interest
                      </Typography>
                      <Typography>{lead[0].product_interest}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Website</Typography>
                      <Typography>{lead[0].website}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Title</Typography>
                      <Typography>{lead[0].title}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Annual Revenue</Typography>
                      <Typography>{lead[0].annual_revenue}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Object</Typography>
                      <Typography>{lead[0].object}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Street</Typography>
                      <Typography>{lead[0].street}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">City</Typography>
                      <Typography>{lead[0].city}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Province</Typography>
                      <Typography>{lead[0].province}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Country</Typography>
                      <Typography>{lead[0].country}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">
                        Decision Timeframe
                      </Typography>
                      <Typography>{lead[0].decision_timeframe}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Decision Maker</Typography>
                      <Typography>{lead[0].decision_maker}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Project Defined</Typography>
                      <Typography>{lead[0].project_defined}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Has Budget</Typography>
                      <Typography>{lead[0].has_budget}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">
                        Dead comment of sales
                      </Typography>
                      <Typography>{lead[0].dead_comment_of_sales}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Bantos</Typography>
                      <Typography>{lead[0].bantos}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Do Not Call</Typography>
                      <Typography>{lead[0].do_not_call}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Rating</Typography>
                      <Typography>{lead[0].rating}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Owner Name</Typography>
                      <Typography>{lead[0].owner_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Created by name</Typography>
                      <Typography>{lead[0].created_by_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Created at</Typography>
                      <Typography>{lead[0].created_at}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Updated by name</Typography>
                      <Typography>{lead[0].updated_by_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Updated at</Typography>
                      <Typography>{lead[0].updated_at}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">
                        Converted by name
                      </Typography>
                      <Typography>{lead[0].converted_by_name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Converted at</Typography>
                      <Typography>{lead[0].converted_at}</Typography>
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

export default ViewAccount;
