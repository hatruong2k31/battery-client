// material-ui
import {
  Button,
  Grid,
  Stack,
  InputLabel,
  OutlinedInput,
  TextField,
  MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";

import { Formik } from "formik";
import useScriptRef from "../../../hooks/useScriptRef";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "../../../store";
import { getSystemConfigs } from "../../../store/reducers/sysConfig";
import axios from "../../../utils/axios";
import { openSnackbar } from "../../../store/reducers/snackbar";

// ============================== Language Select =============================== //
const langLst = [
  { value: "en", label: "English" },
  { value: "vi", label: "Tiếng Việt" },
];

// ==============================|| ACCOUNT PROFILE - SETTINGS ||============================== //

const SystemSettingTab = () => {
  const scriptedRef = useScriptRef();

  const theme = useTheme();
  const dispatch = useDispatch();
  const [lang, setLang] = useState([]);

  const { sys_configs } = useSelector((state) => state.sys_config);
  const initValue = { submit: null };

  useEffect(() => {
    dispatch(getSystemConfigs());

    setLang(langLst);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  sys_configs.map((key, index) => {
    initValue[key.param_code] = key.param_value;
  });

  return (
    <>
      <Formik
        initialValues={initValue}
        enableReinitialize
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            let dataSubmit = [];
            Object.keys(values).map((v) => {
              dataSubmit.push({ param_code: v, param_value: values[v] });
            });

            const token = JSON.parse(localStorage.getItem("token"));
            const header = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            await axios
              .put("/api/system_parameter/bulk_update", dataSubmit, header)
              .then(
                () => {
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: "Submit Success",
                      variant: "alert",
                      alert: {
                        color: "success",
                      },
                      close: false,
                    })
                  );
                },
                (err) => {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: err.message,
                      variant: "alert",
                      alert: {
                        color: "error",
                      },
                      close: false,
                    })
                  );
                }
              );
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
            dispatch(
              openSnackbar({
                open: true,
                message: err.message,
                variant: "alert",
                alert: {
                  color: "error",
                },
                close: false,
              })
            );
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <Stack spacing={2.5}>
                  <InputLabel htmlFor="date_format">
                    Định dạng trường Ngày
                  </InputLabel>
                  <OutlinedInput
                    id="date_format"
                    type="text"
                    value={values.date_format}
                    name="date_format"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="dd/MM/yyyy"
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Stack spacing={2.5}>
                  <InputLabel htmlFor="price_format">
                    Định dạng trường Giá
                  </InputLabel>
                  <OutlinedInput
                    id="price_format"
                    type="text"
                    value={values.price_format}
                    name="price_format"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="######"
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Stack spacing={2.5}>
                  <InputLabel htmlFor="thousands_separate">
                    Ký tự ngăn cách hàng nghìn
                  </InputLabel>
                  <OutlinedInput
                    id="thousands_separate"
                    type="text"
                    value={values.thousands_separate}
                    name="thousands_separate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="."
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Stack spacing={2.5}>
                  <InputLabel htmlFor="decimal_separate">
                    Ký tự ngăn cách số thập phân
                  </InputLabel>
                  <OutlinedInput
                    id="decimal_separate"
                    type="text"
                    value={values.decimal_separate}
                    name="decimal_separate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=","
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Stack spacing={2.5}>
                  <InputLabel htmlFor="negative_format">Ký tự số âm</InputLabel>
                  <OutlinedInput
                    id="negative_format"
                    type="text"
                    value={values.negative_format}
                    name="negative_format"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="()"
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Stack spacing={2.5}>
                  <InputLabel htmlFor="language">Ngôn ngữ</InputLabel>
                  {/* <OutlinedInput
                    id="language"
                    type="text"
                    value={values.language}
                    name="language"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="()"
                    fullWidth
                  /> */}

                  <TextField
                    name="language"
                    id="language"
                    fullWidth
                    select
                    value={values.language || ""}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {lang.map((l) => (
                      <MenuItem key={l.value} value={l.value}>
                        {l.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    disabled={isSubmitting}
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SystemSettingTab;
