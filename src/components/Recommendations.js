import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { recommendationsStore } from "../stores/recommendationsStore";
import { CircularProgress, Typography, Box, Alert } from "@mui/material";
import RecommendationCard from "./RecommendationCard";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const recommendations = useStore(recommendationsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateRecommendations = () => {
      try {
        const newRecommendations = [];
        const totalExpenses = transactions.reduce((total, transaction) => {
          return transaction.type === "expense" ? total + transaction.amount : total;
        }, 0);

        if (totalExpenses === 0) {
          newRecommendations.push({
            title: "Start Tracking",
            type: "info",
            message: "You haven't recorded any expenses yet. Start tracking to get personalized recommendations!",
          });
        } else {

          if (totalExpenses > 1000) {
            newRecommendations.push({
              title: "High Spending Alert",
              type: "warning",
              message: "Your expenses are quite high this month. Consider reviewing your spending habits.",
            });
          }
        }

        recommendationsStore.set(newRecommendations);
      } catch (err) {
        setError("Error generating recommendations");
      } finally {
        setLoading(false);
      }
    };

    generateRecommendations();
  }, [transactions]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Financial Insights
      </Typography>
      {recommendations.map((rec, index) => (
        <RecommendationCard key={index} recommendation={rec} />
      ))}
    </Box>
  );
}

export default Recommendations;
