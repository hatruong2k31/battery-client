import React from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
//project import
import get from "../../utils/request";

function Contact() {
  return (
    <>
      <div>Contact</div>
      <Button
        onClick={function () {
          get("");
        }}
      />
    </>
  );
}

export default Contact;
