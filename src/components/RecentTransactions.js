import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import TransactionList from "./TransactionList";

function RecentTransactions() {
  const transactions = useStore(transactionsStore);
  const recentTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recentTransactions.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">No recent transactions available.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "100%", overflow: "auto" }}>
      <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
      <TransactionList transactions={recentTransactions} />
    </Box>
  );
}

export default RecentTransactions;
