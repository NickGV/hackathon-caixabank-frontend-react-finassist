import React from "react";
import { TextField } from "@mui/material";

const DescriptionField = ({ value, onChange, error, helperText }) => {
  return (
    <TextField
      label="Description"
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
      name="description"
      error={!!error}
      helperText={helperText}
    />
  );
};

export default DescriptionField;
