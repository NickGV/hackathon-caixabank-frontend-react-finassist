import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import { categoryKeywords } from "../constants/categoryKeywords";
import { allCategories } from "../constants/categories";

function TransactionForm({ transactionToEdit, onClose }) {
  const transactions = useStore(transactionsStore);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const assignCategory = (desc) => {
    for (const [keyword, category] of Object.entries(categoryKeywords)) {
      if (desc.toLowerCase().includes(keyword)) {
        return category;
      }
    }
    return "Other Expenses";
  };

  // Auto-assign a category if adding a new transaction
  useEffect(() => {
    if (!transactionToEdit) {
      const category = assignCategory(description);
      setCategory(category);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Instructions:
    // - Validate that all fields are filled in.
    // - If editing, update the transaction in the store.
    // - If adding a new transaction, create it and save it to the store.
    // - The transaction type should be either "income" or "expense".
    // - Ensure the transaction has the following structure: { id, description, amount, type, category, date }

    if (!description || !amount || !type || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    if (transactionToEdit) {
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === transactionToEdit.id ? newTransaction : transaction
      );
      transactionsStore.set(updatedTransactions);
    } else {
      transactionsStore.set([...transactions, newTransaction]);
    }

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                required
                name="description"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount (€)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 0, step: "0.01" }}
                name="amount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                  name="type"
                  inputProps={{ name: "filterTypeForm" }}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  name="category"
                  inputProps={{ name: "filterCategoryForm" }}
                >
                  {allCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                  <MenuItem value="Other Expenses">Other Expenses</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <TextField
              item
              xs={12}
              sm={6}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              margin="normal"
              required
              name="date"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: 2,
            }}
          >
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add-transaction-button"
            >
              {transactionToEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TransactionForm;
