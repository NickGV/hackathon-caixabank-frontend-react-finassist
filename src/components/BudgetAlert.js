// src/components/BudgetAlert.js
import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import { transactionsStore } from "../stores/transactionStore";
import { Alert } from "@mui/material";
import { budgetAlertStore } from "../stores/budgetAlertStore"; // Importar el store de alertas

const BudgetAlert = () => {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);

  const totalExpense = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;
  const categoryExpenses = transactions.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const categoryExceeded = Object.keys(userSettings.categoryLimits).some(
    (category) =>
      categoryExpenses[category] > userSettings.categoryLimits[category]
  );

  useEffect(() => {
    if (budgetExceeded) {
      budgetAlertStore.set({
        isVisible: true,
        message: `You have exceeded your total budget limit of ${userSettings.totalBudgetLimit} €!`,
        notificationCount: budgetAlertStore.get().notificationCount + 1,
        severity: "warning",
      });
    } else if (categoryExceeded) {
      budgetAlertStore.set({
        isVisible: true,
        message: `You have exceeded your category budget limit!`,
        notificationCount: budgetAlertStore.get().notificationCount + 1,
        severity: "warning",
      });
    } else {
      budgetAlertStore.set({
        isVisible: false,
        message: "",
        notificationCount: 0,
        severity: "info",
      });
    }
  }, [budgetExceeded, categoryExceeded, userSettings]);

  return (
    <Alert
      severity={budgetAlertStore.get().severity}
      sx={{ mb: 2 }}
      hidden={!budgetAlertStore.get().isVisible}
    >
      {budgetAlertStore.get().message}
    </Alert>
  );
};

export default BudgetAlert;
