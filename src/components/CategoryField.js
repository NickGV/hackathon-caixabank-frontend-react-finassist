import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const CategoryField = ({ value, onChange, error, categories }) => {
  return (
    <FormControl fullWidth margin="normal" required error={!!error}>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        value={value}
        onChange={onChange}
        label="Category"
        name="category"
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CategoryField;
