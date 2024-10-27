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
    } else if (categoryExpenses) {
      budgetAlertStore.set({
        isVisible: true,
        message: `You have exceeded your category budget limit of ${userSettings.categoryLimits} €!`,
        notificationCount: budgetAlertStore.get().notificationCount + 1,
        severity: "warning",
      });
    } else {
      budgetAlertStore.set({
        isVisible: true,
        message: `You have exceeded your category budget limit of ${userSettings.categoryLimits} €!`,
        notificationCount: budgetAlertStore.get().notificationCount + 1,
        severity: "info",
      });
    }
    // Instructions:
    // - If the budget has been exceeded, set the `isVisible` property in the `budgetAlertStore` to true and provide a warning message.
    // - If the budget has not been exceeded, set `isVisible` to false and clear the message.
  }, [budgetExceeded, userSettings.totalBudgetLimit]);

  return (
    <Alert
      severity={BudgetAlert.severity}
      sx={{ mb: 2 }}
      hidden={!budgetAlertStore.get().isVisible}
    >
      {budgetAlertStore.get().message}
    </Alert>
  );
};

export default BudgetAlert;
