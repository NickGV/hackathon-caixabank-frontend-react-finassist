import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BalanceChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="balance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
