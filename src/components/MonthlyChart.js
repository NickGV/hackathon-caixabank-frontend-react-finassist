import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';

const MonthlyChart = () => {
    const transactions = useStore(transactionsStore);

    // Calcular gastos mensuales
    const monthlyData = transactions.reduce((acc, transaction) => {
        const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
        if (!acc[month]) {
            acc[month] = { month, amount: 0 };
        }
        if (transaction.type === "expense") {
            acc[month].amount += transaction.amount;
        }
        return acc;
    }, {});

    const sortedMonthlyData = Object.values(monthlyData).sort((a, b) => new Date(a.month) - new Date(b.month));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedMonthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlyChart;
