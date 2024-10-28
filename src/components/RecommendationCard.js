import React from "react";
import { Card, CardContent, Typography, Alert } from "@mui/material";

const RecommendationCard = ({ recommendation }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{recommendation.title}</Typography>
        <Alert severity={recommendation.type}>{recommendation.message}</Alert>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
