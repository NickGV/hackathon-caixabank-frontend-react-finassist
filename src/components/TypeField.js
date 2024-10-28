import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const TypeField = ({ value, onChange, error }) => {
  return (
    <FormControl fullWidth margin="normal" required error={!!error}>
      <InputLabel id="type-label">Type</InputLabel>
      <Select
        labelId="type-label"
        value={value}
        onChange={onChange}
        label="Type"
        name="type"
        variant="outlined"
      >
        <MenuItem value="expense">Expense</MenuItem>
        <MenuItem value="income">Income</MenuItem>
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default TypeField;
