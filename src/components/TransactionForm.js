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
  FormHelperText,
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
  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category: "",
    date: ""
  });

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Description validation
    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (description.length < 3) {
      newErrors.description = "Description must be at least 3 characters";
      isValid = false;
    }

    // Amount validation
    if (!amount) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
      isValid = false;
    }

    // Category validation
    if (!category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    // Date validation
    if (!date) {
      newErrors.date = "Date is required";
      isValid = false;
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.date = "Date cannot be in the future";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTransaction = {
      id: transactionToEdit?.id || Date.now(),
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
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: "" });
                }}
                fullWidth
                margin="normal"
                required
                name="description"
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount (€)"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrors({ ...errors, amount: "" });
                }}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 0, step: "0.01" }}
                name="amount"
                error={!!errors.amount}
                helperText={errors.amount}
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
              <FormControl 
                fullWidth 
                margin="normal" 
                required
                error={!!errors.category}
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setErrors({ ...errors, category: "" });
                  }}
                  label="Category"
                  name="category"
                >
                  {allCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <TextField
              item
              xs={12}
              sm={6}
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors({ ...errors, date: "" });
              }}
              fullWidth
              margin="normal"
              required
              name="date"
              error={!!errors.date}
              helperText={errors.date}
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
