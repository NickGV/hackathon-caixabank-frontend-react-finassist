import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { 
  CircularProgress, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Alert,
  Button
} from "@mui/material";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const generateRecommendations = () => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const thisMonthExpenses = transactions.filter(t => {
        const transDate = new Date(t.date);
        return t.type === 'expense' && 
               transDate.getMonth() === currentMonth &&
               transDate.getFullYear() === currentYear;
      });

      const lastMonthExpenses = transactions.filter(t => {
        const transDate = new Date(t.date);
        return t.type === 'expense' && 
               transDate.getMonth() === (currentMonth - 1) &&
               transDate.getFullYear() === currentYear;
      });

      const thisMonthTotal = thisMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
      const lastMonthTotal = lastMonthExpenses.reduce((sum, t) => sum + t.amount, 0);

      const newRecommendations = [];

      if (lastMonthTotal === 0) {
        newRecommendations.push({
          type: 'info',
          message: "Start tracking your expenses to get personalized recommendations!"
        });
      } else {
        const percentageChange = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
        
        if (percentageChange > 10) {
          newRecommendations.push({
            type: 'warning',
            message: `Your spending has increased by ${Math.round(percentageChange)}% compared to last month. Consider reviewing your expenses.`
          });
        } else if (percentageChange < -10) {
          newRecommendations.push({
            type: 'success',
            message: `Great job! You've reduced your spending by ${Math.round(Math.abs(percentageChange))}% compared to last month.`
          });
        } else {
          newRecommendations.push({
            type: 'info',
            message: "Your spending is stable compared to last month."
          });
        }
      }

      const categoryTotals = {};
      thisMonthExpenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });

      const highestCategory = Object.entries(categoryTotals)
        .sort(([,a], [,b]) => b - a)[0];

      if (highestCategory) {
        newRecommendations.push({
          type: 'info',
          message: `Your highest spending category is ${highestCategory[0]} (€${Math.round(highestCategory[1])}).`
        });
      }

      setRecommendations(newRecommendations);
    } catch (err) {
      setError("Error generating recommendations");
    }
  };

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        generateRecommendations();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [transactions]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        p: 3 
      }}>
        <CircularProgress />
        <Typography color="text.secondary">
          Analyzing your transactions...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error"
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={generateRecommendations}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Financial Insights
          </Typography>
          {recommendations.map((rec, index) => (
            <Alert 
              key={index} 
              severity={rec.type} 
              sx={{ mt: index > 0 ? 2 : 0 }}
            >
              {rec.message}
            </Alert>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Recommendations;
