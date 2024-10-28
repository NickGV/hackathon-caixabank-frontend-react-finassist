import React from "react";
import { Box, Typography } from "@mui/material";

const StatisticsDisplay = ({ totalIncome, totalExpense }) => {
  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">Statistics</Typography>
      <Typography variant="body1">Total Income: €{totalIncome.toFixed(2)}</Typography>
      <Typography variant="body1">Total Expenses: €{totalExpense.toFixed(2)}</Typography>
      <Typography variant="body1">Balance: €{(totalIncome - totalExpense).toFixed(2)}</Typography>
    </Box>
  );
};

export default StatisticsDisplay;
