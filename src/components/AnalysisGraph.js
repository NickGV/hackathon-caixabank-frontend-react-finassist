import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { Alert, CircularProgress } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalysisGraph() {
  const transactions = useStore(transactionsStore);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processChartData = () => {
      try {
        const categories = [...new Set(transactions.map((t) => t.category))];
        const chartData = categories.map((category) => {
          const income = transactions
            .filter((t) => t.category === category && t.type === "income")
            .reduce((acc, t) => acc + parseFloat(t.amount), 0);

          const expense = transactions
            .filter((t) => t.category === category && t.type === "expense")
            .reduce((acc, t) => acc + parseFloat(t.amount), 0);

          return { category, Income: income, Expense: expense };
        });

        setData(chartData);
      } catch (err) {
        setError("Error processing chart data");
      } finally {
        setLoading(false);
      }
    };

    processChartData();
  }, [transactions]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AnalysisGraph;
