import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { CircularProgress, Typography, Box, Card, CardContent } from "@mui/material";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const randomError = Math.random() < 0.1;
      if (randomError) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      } else {
        setError(null);
        setLoading(false);
      }
    }, 1000);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Implement logic to compare expenses between months
  // Instructions:
  // - Use the transactions to calculate expenses for the current and previous months.
  // - Filter transactions by type ('expense') and by month/year.
  // - Compare the total expenses of this month with last month.

  const expenses = transactions.filter((t) => t.type === "expense");
  const expenseThisMonth = expenses.filter(
    (t) => t.date.getMonth() === new Date().getMonth()
  );
  const expenseLastMonth = expenses.filter(
    (t) => t.date.getMonth() === new Date().getMonth() - 1
  );

  let message = "";

  if (expenseLastMonth.length === 0) {
    message = "Keep up the good work. You haven't recorded any expenses yet.";
  } else if (expenseThisMonth > expenseLastMonth) {
    const percentageIncrease = Math.round(
      ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) * 100
    );
    message = `Congratulations! Your expenses have increased by ${percentageIncrease}% this month.`;
  } else if (expenseThisMonth < expenseLastMonth) {
    const percentageDecrease = Math.round(
      ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) * 100
    );
    message = `Your expenses have decreased by ${percentageDecrease}% last month.`;
  } else {
    message = "Your expenses haven't changed since last month.";
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">Recommendations</Typography>
          <Typography>{message}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Recommendations;
