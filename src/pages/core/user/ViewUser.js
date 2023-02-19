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
import { getPayment } from "../../../store/reducers/payment";
import { getGenders } from "../../../store/reducers/masterData";
// import { openSnackbar } from "../../../store/reducers/snackbar";
import { selectProvince, selectDistrict } from "../../../utils/selectRequest";
import { del } from "../../../utils/request";

const ViewContact = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const countries = [{ id: "01", name: "Việt Nam" }];
  const { genders } = useSelector((state) => state.masterData);
  const { contact } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPayment(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (contact && contact.id === Number(id)) {
      selectProvince(contact.country).then((response) =>
        setProvinces(response.data)
      );
      selectDistrict(contact.province).then((response) =>
        setDistricts(response.data)
      );
    }
  }, [contact]);

  const handleCancel = () => {
    history(`/contact/list`);
  };

  return (
    <>
      {contact && contact.id === Number(id) && (
        <MainCard title="View Contact">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ p: 0, pb: 0 }}
            spacing={1}
          ></Stack>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MainCard title="Contact information">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>First Name</InputLabel>
                    <OutlinedInput
                      id="firstname"
                      type="text"
                      value={contact.firstname}
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
                      value={contact.middlename}
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
                      value={contact.lastname}
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
                      value={contact.identity_card}
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
                          value={contact.birthdate}
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
                      select
                      id="gender"
                      placeholder="Select Gender"
                      fullWidth
                      defaultValue={contact.gender || ""}
                      inputProps={{ readOnly: true }}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.id} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
                      value={contact.mobile_phone}
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
                      value={contact.phone}
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
                      value={contact.homephone}
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
                      value={contact.email}
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
                      value={contact.title}
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
                      value={contact.department}
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
                      value={contact.description}
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
                        contact.donotcall ? (
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
                      Contact Owner :
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ fontWeight: 1000, fontSize: 15 }}
                      >
                        {" " + contact.owner_name}
                      </Typography>
                    </InputLabel>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard title="Address information">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Country</InputLabel>
                    <TextField
                      name="country"
                      select
                      id="country"
                      placeholder="Select Country"
                      fullWidth
                      inputProps={{ readOnly: true }}
                      defaultValue={contact.country || "1"}
                      variant="outlined"
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Province</InputLabel>
                    <TextField
                      name="province"
                      select
                      id="province"
                      placeholder="Select Province"
                      fullWidth
                      inputProps={{ readOnly: true }}
                      defaultValue={contact.province || ""}
                      variant="outlined"
                    >
                      {provinces.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>District</InputLabel>
                    <TextField
                      name="district"
                      select
                      id="district"
                      placeholder="Select District"
                      fullWidth
                      inputProps={{ readOnly: true }}
                      defaultValue={contact.district || ""}
                      variant="outlined"
                    >
                      {districts.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ mb: 1 }}>Street</InputLabel>
                    <OutlinedInput
                      id="street"
                      type="text"
                      value={contact.street}
                      name="street"
                      fullWidth
                      readOnly
                    />
                  </Grid>
                </Grid>
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
                    history(`/contact/edit/${contact.id}`);
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

export default ViewContact;
