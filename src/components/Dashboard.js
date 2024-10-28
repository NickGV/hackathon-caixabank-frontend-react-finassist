import React, { Profiler, useEffect, Suspense } from "react";
import { useStore } from "@nanostores/react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import ExportButton from "./ExportButton";
import DownloadProfilerData from "./DownloadProfilerData";
import { onRenderCallback } from "../utils/onRenderCallback";
import { transactionsStore } from "../stores/transactionStore";

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import("./AnalysisGraph"));
const BalanceOverTime = React.lazy(() => import("./BalanceOverTime"));
const Statistics = React.lazy(() => import("./Statistics"));
const Recommendations = React.lazy(() => import("./Recommendations"));
const RecentTransactions = React.lazy(() => import("./RecentTransactions"));

function Dashboard() {
  const transactions = useStore(transactionsStore);
  const [dashboardData, setDashboardData] = React.useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const calculateDashboardData = async () => {
      try {
        const totalIncome = transactions.reduce((total, transaction) => {
          if (transaction.type === "income") {
            return total + transaction.amount;
          }
          return total;
        }, 0);
        const totalExpense = transactions.reduce((total, transaction) => {
          if (transaction.type === "expense") {
            return total + transaction.amount;
          }
          return total;
        }, 0);
        const balance = totalIncome - totalExpense;
        setDashboardData({ totalIncome, totalExpense, balance });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    calculateDashboardData();
  }, [transactions]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Dashboard
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <ExportButton data={transactions} />
          <DownloadProfilerData />
        </Stack>

        {/* Totals Section */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Total Income
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-income"
                color="success.main"
              >
                €{dashboardData.totalIncome.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Total Expenses
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-expenses"
                color="error.main"
              >
                €{dashboardData.totalExpense.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Balance
              </Typography>
              <Typography
                variant="h5"
                data-testid="balance"
                color={
                  dashboardData.balance >= 0 ? "success.main" : "error.main"
                }
              >
                €{dashboardData.balance.toFixed(2)}
              </Typography>
              {dashboardData.balance < 0 && (
                <Alert severity="warning" sx={{ mt: 1 }}>
                  Your balance is negative. Consider reducing expenses.
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <Statistics transactions={transactions} />
            </Suspense>
          </Grid>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <Recommendations />
            </Suspense>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Income vs Expenses by Category
              </Typography>
              <Suspense fallback={<CircularProgress />}>
                <AnalysisGraph />
              </Suspense>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Balance Over Time
              </Typography>
              <Suspense fallback={<CircularProgress />}>
                <BalanceOverTime />
              </Suspense>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Suspense fallback={<CircularProgress />}>
            <RecentTransactions transactions={transactions} />
          </Suspense>
        </Box>
      </Box>
    </Profiler>
  );
}

export default Dashboard;
