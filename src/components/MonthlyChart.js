import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlyChart;
