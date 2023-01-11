import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Stack,
  Typography,
  Button,
  InputLabel,
  TextField,
} from "@mui/material";

// project imports
import MainCard from "../../../components/MainCard";
import { useDispatch, useSelector } from "../../../store";
import { getAccount } from "../../../store/reducers/account";
import { getAccountTypes } from "../../../store/reducers/masterData";

const ViewAccount = () => {
  const history = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const { accountTypes } = useSelector((state) => state.masterData);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getAccountTypes());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accountTypes) {
      dispatch(getAccount(id));

      if (account) {
        const isShow = accountTypes.find(
          (a) => a.code === account.accountData[0].type
        ).is_person_account;

        setShow(isShow);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountTypes]);

  const handleCancel = () => {
    history(`/account/list`);
  };

  const handleEdit = () => {
    history(`/account/edit/${id}`);
  };

  return (
    <>
      {accountTypes && account && account.accountData[0].id === Number(id) && (
        <MainCard title="View Account">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MainCard title="Account information">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="type">Account Type</InputLabel>
                      <TextField
                        fullWidth
                        id="type"
                        name="type"
                        value={account.accountData[0].type || ""}
                      ></TextField>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <Typography color="secondary">Account Owner</Typography>
                      <Typography>
                        {account.accountData[0].owner_name || ""}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="name">Account Name</InputLabel>
                      <TextField
                        fullWidth
                        value={account.accountData[0].name || ""}
                        id="name"
                        type="text"
                        name="name"
                      />
                    </Stack>
                  </Grid>
                  {show && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="identity_card">
                            Identity Card
                          </InputLabel>
                          <TextField
                            fullWidth
                            type="text"
                            id="identity_card"
                            name="identity_card"
                            values={account.accountData[0].identity_card || ""}
                          ></TextField>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="birthdate">Birthdate</InputLabel>
                          <TextField
                            fullWidth
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            values={account.accountData[0].birthdate || ""}
                          ></TextField>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="mobile_phone">Mobile</InputLabel>
                          <TextField
                            fullWidth
                            type="text"
                            id="mobile_phone"
                            name="mobile_phone"
                            values={account.accountData[0].mobile_phone || ""}
                          ></TextField>
                        </Stack>
                      </Grid>
                    </>
                  )}
                  {!show && (
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="tax_code">Tax Code</InputLabel>
                        <TextField
                          placeholder="Tax Code"
                          fullWidth
                          type="text"
                          id="tax_code"
                          name="tax_code"
                          values={account.accountData[0].tax_code || ""}
                        ></TextField>
                      </Stack>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="phone">Phone</InputLabel>
                      <TextField
                        placeholder="Phone"
                        fullWidth
                        type="text"
                        id="phone"
                        name="phone"
                        values={account.accountData[0].phone || ""}
                      ></TextField>
                    </Stack>
                  </Grid>
                  {!show && (
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="website">Website</InputLabel>
                        <TextField
                          placeholder="Website"
                          fullWidth
                          type="text"
                          id="website"
                          name="website"
                          values={account.accountData[0].website || ""}
                        ></TextField>
                      </Stack>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <TextField
                        placeholder="Email"
                        fullWidth
                        type="text"
                        id="email"
                        name="email"
                        values={account.accountData[0].email || ""}
                      ></TextField>
                    </Stack>
                  </Grid>
                  {show && <Grid item xs={12} sm={6}></Grid>}
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="site">Account Site</InputLabel>
                      <TextField
                        fullWidth
                        values={account.accountData[0].site || ""}
                        id="site"
                        type="text"
                        name="site"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="year_started">
                        Year Started
                      </InputLabel>
                      <TextField
                        fullWidth
                        values={account.accountData[0].year_started || ""}
                        id="year_started"
                        type="text"
                        name="year_started"
                      />
                    </Stack>
                  </Grid>
                  {show && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="title">Title</InputLabel>
                          <TextField
                            fullWidth
                            values={account.accountData[0].title || ""}
                            id="title"
                            placeholder="Title"
                            type="text"
                            name="title"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="department">
                            Department
                          </InputLabel>
                          <TextField
                            fullWidth
                            values={account.accountData[0].department || ""}
                            id="department"
                            placeholder="Department"
                            type="text"
                            name="department"
                          />
                        </Stack>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="industry">Industry</InputLabel>
                      <TextField
                        fullWidth
                        id="industry"
                        name="industry"
                        values={account.accountData[0].industry || ""}
                      ></TextField>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="employees">Employees</InputLabel>
                      <TextField
                        fullWidth
                        id="employees"
                        name="employees"
                        values={account.accountData[0].employees || ""}
                      ></TextField>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="total_sales">Total Sales</InputLabel>
                      <TextField
                        fullWidth
                        values={account.accountData[0].total_sales || ""}
                        id="total_sales"
                        type="text"
                        name="total_sales"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="accountsource">
                        Account Source
                      </InputLabel>
                      <TextField
                        fullWidth
                        values={account.accountData[0].accountsource || ""}
                        id="accountsource"
                        type="text"
                        name="accountsource"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="parent_account">
                        Parent Account
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="parent_account"
                        value={account.accountData[0].parent_account || ""}
                        name="parent_account"
                      ></TextField>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="description">Description</InputLabel>
                      <TextField
                        fullWidth
                        values={account.accountData[0].description || ""}
                        id="description"
                        placeholder="Description"
                        type="text"
                        name="description"
                        multiline
                        rows={2}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard title="Address information">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="billing_address">
                          Billing Address
                        </InputLabel>
                        <TextField
                          placeholder="Billing Address"
                          fullWidth
                          type="text"
                          id="billing_address"
                          name="billing_address"
                          values={account.accountData[0].billing_address || ""}
                        ></TextField>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="billing_street">
                          Billing Street
                        </InputLabel>
                        <TextField
                          placeholder="Billing Street"
                          fullWidth
                          type="text"
                          id="billing_street"
                          name="billing_street"
                          values={account.accountData[0].billing_street || ""}
                        ></TextField>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="billing_city">
                          Billing City
                        </InputLabel>
                        <TextField
                          placeholder="Billing City"
                          fullWidth
                          type="text"
                          id="billing_city"
                          name="billing_city"
                          values={account.accountData[0].billing_city || ""}
                        ></TextField>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="billing_province">
                          Billing Province
                        </InputLabel>
                        <TextField
                          placeholder="Billing Province"
                          fullWidth
                          type="text"
                          id="billing_province"
                          name="billing_province"
                          values={account.accountData[0].billing_province || ""}
                        ></TextField>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="billing_country">
                          Billing Country
                        </InputLabel>
                        <TextField
                          placeholder="Billing Country"
                          fullWidth
                          type="text"
                          id="billing_country"
                          name="billing_country"
                          values={account.accountData[0].billing_country || ""}
                        ></TextField>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="shipping_address">
                          Shipping Address
                        </InputLabel>
                        <TextField
                          placeholder="Shipping Address"
                          fullWidth
                          type="text"
                          id="shipping_address"
                          name="shipping_address"
                          values={account.accountData[0].shipping_address || ""}
                        ></TextField>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="shipping_street">
                          Shipping Street
                        </InputLabel>
                        <TextField
                          placeholder="Shipping Street"
                          fullWidth
                          type="text"
                          id="shipping_street"
                          name="shipping_street"
                          values={account.accountData[0].shipping_street || ""}
                        ></TextField>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="shipping_city">
                          Shipping City
                        </InputLabel>
                        <TextField
                          placeholder="Shipping City"
                          fullWidth
                          type="text"
                          id="shipping_city"
                          name="shipping_city"
                          values={account.accountData[0].shipping_city || ""}
                        ></TextField>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="shipping_province">
                          Shipping Province
                        </InputLabel>
                        <TextField
                          placeholder="Shipping Province"
                          fullWidth
                          type="text"
                          id="shipping_province"
                          name="shipping_province"
                          values={
                            account.accountData[0].shipping_province || ""
                          }
                        ></TextField>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="shipping_country">
                          Shipping Country
                        </InputLabel>
                        <TextField
                          placeholder="Shipping Country"
                          fullWidth
                          type="text"
                          id="shipping_country"
                          name="shipping_country"
                          values={account.accountData[0].shipping_country || ""}
                        ></TextField>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </MainCard>
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
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default ViewAccount;
