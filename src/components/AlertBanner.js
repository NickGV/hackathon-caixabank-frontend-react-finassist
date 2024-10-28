import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { userSettingsStore } from "../stores/userSettingsStore";
import { Alert, Collapse } from "@mui/material";

function AlertBanner() {
  const transactions = useStore(transactionsStore);
  const userSettings = useStore(userSettingsStore);

  const { totalBudgetLimit, categoryLimits, alertsEnabled } = userSettings;

  if (!alertsEnabled) return null;

  const totalExpenses = transactions.reduce((total, transaction) => {
    return transaction.type === "expense" ? total + transaction.amount : total;
  }, 0);

  const overTotalBudget = totalExpenses > totalBudgetLimit;

  const exceededCategories = Object.keys(categoryLimits).filter((category) => {
    const categoryExpenses = transactions
      .filter((transaction) => transaction.category === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
    return categoryExpenses > categoryLimits[category];
  });

  return (
    <div>
      <Collapse in={overTotalBudget}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          You have exceeded your total budget limit of {totalBudgetLimit} €!
        </Alert>
      </Collapse>

      {exceededCategories.map((category) => (
        <Alert severity="warning" sx={{ mb: 2 }} key={category}>
          You have exceeded your budget limit for {category} (
          {categoryLimits[category]} €)!
        </Alert>
      ))}
    </div>
  );
}

export default AlertBanner;
