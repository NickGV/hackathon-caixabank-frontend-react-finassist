import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore, addTransaction } from "../stores/transactionStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import { categoryKeywords } from "../constants/categoryKeywords";
import { allCategories } from "../constants/categories";
import DescriptionField from "./DescriptionField";
import AmountField from "./AmountField";
import CategoryField from "./CategoryField";

function TransactionForm({ transactionToEdit, onClose }) {
  const transactions = useStore(transactionsStore);

  const [description, setDescription] = useState(
    transactionToEdit ? transactionToEdit.description : ""
  );
  const [amount, setAmount] = useState(
    transactionToEdit ? transactionToEdit.amount : ""
  );
  const [type, setType] = useState(
    transactionToEdit ? transactionToEdit.type : "expense"
  );
  const [category, setCategory] = useState(
    transactionToEdit ? transactionToEdit.category : ""
  );
  const [date, setDate] = useState(
    transactionToEdit
      ? transactionToEdit.date
      : new Date().toISOString().split("T")[0]
  );
  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const assignCategory = (desc) => {
    for (const [keyword, category] of Object.entries(categoryKeywords)) {
      if (desc.toLowerCase().includes(keyword)) {
        return category;
      }
    }
    return "Other Expenses";
  };

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

    if (!amount) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
      isValid = false;
    }

    if (!category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

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
      addTransaction(newTransaction);
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
              <DescriptionField
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: "" });
                }}
                error={errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AmountField
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrors({ ...errors, amount: "" });
                }}
                error={errors.amount}
                helperText={errors.amount}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CategoryField
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrors({ ...errors, category: "" });
                }}
                error={errors.category}
                categories={allCategories}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date"
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
