import React from "react";
import { TextField } from "@mui/material";

const AmountField = ({ value, onChange, error, helperText }) => {
  return (
    <TextField
      label="Amount (€)"
      type="number"
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      required
      inputProps={{ min: 0, step: "0.01" }}
      name="amount"
      error={!!error}
      helperText={helperText}
    />
  );
};

export default AmountField;
