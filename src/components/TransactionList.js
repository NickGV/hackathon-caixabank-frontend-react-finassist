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
import TransactionForm from "./TransactionForm";

function TransactionList({ transactions: propTransactions }) {
  const transactionsFromStore = useStore(transactionsStore);
  const transactions = propTransactions || transactionsFromStore;

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [openForm, setOpenForm] = useState(false); 
  const [transactionToEdit, setTransactionToEdit] = useState(null); 

  const deleteTransaction = useCallback((id) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = currentTransactions.filter(
      (transaction) => transaction.id !== id
    );
    transactionsStore.set(updatedTransactions); 
  }, []);

  const handleEdit = useCallback((transaction) => {
    setTransactionToEdit(transaction); 
    setOpenForm(true); 
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

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setTransactionToEdit(null);
          setOpenForm(true); 
        }}
      >
        Add Transaction
      </Button>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {/* Aquí puedes agregar dinámicamente las categorías */}
            {Array.from(new Set(transactions.map(t => t.category))).map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
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

      {/* Formulario de transacción */}
      {openForm && (
        <TransactionForm 
          transactionToEdit={transactionToEdit} 
          onClose={() => {
            setOpenForm(false);
            setTransactionToEdit(null); 
          }} 
        />
      )}
    </Box>
  );
}

export default TransactionList;
