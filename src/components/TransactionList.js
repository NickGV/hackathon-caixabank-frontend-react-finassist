import React, { useState, useMemo, useCallback } from "react";
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
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";

function TransactionList({ transactions: propTransactions }) {
  const transactionsFromStore = useStore(transactionsStore);
  const transactions = propTransactions || transactionsFromStore;

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteTransaction = useCallback((id) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = currentTransactions.filter(
      (transaction) => transaction.id !== id
    );
    transactionsStore.set(updatedTransactions); // Update the store
  }, []);

  // Implement edit functionality
  const handleEdit = useCallback((transaction) => {
    // Implement functionality to edit a transaction
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesCategory = filterCategory
        ? transaction.category === filterCategory
        : true;
      const matchesType = filterType ? transaction.type === filterType : true;
      return matchesCategory && matchesType;
    });
  }, [transactions, filterCategory, filterType]);

  const sortedTransactions = useMemo(() => {
    if (sortField) {
      return [...filteredTransactions].sort((a, b) => {
        if (sortField === "amount") {
          return a.amount - b.amount;
        } else if (sortField === "date") {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
    }
    return filteredTransactions;
  }, [filteredTransactions, sortField]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transaction List
      </Typography>

      {/* Add transaction */}
      {/* Instructions:
                - Implement the logic to open a form for adding a new transaction.
                - Trigger the form/modal through the onClick event. */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          /* Implement functionality to add transaction */
        }}
      >
        Add Transaction
      </Button>

      {/* Filters */}
      {/* Instructions:
                - Implement category and type filters using Material UI's `Select` component.
                - Update the filterCategory and filterType state values when the user makes a selection.
                - Apply the selected filters to the displayed transactions. */}
      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {/* Add additional categories dynamically */}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-type-label">Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="sort-field-label">Sort By</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table of transactions */}
      {/* Instructions:
                - Render the transactions in a table format using Material UI's `Table` component.
                - For each transaction, display the following details: description, amount, type, category, and date.
                - Implement the action buttons (Edit, Delete) within each row for managing transactions. */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString("en-US")}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(transaction)}>Edit</Button>
                  <Button onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TransactionList;
