import React, { memo } from 'react'; 
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceOverTime = memo(() => { 
    const transactions = useStore(transactionsStore);

    // Calcular el balance acumulado
    const balanceData = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString("en-US");
        if (!acc[date]) {
            acc[date] = { date, balance: 0 };
        }
        acc[date].balance += transaction.type === "income" ? transaction.amount : -transaction.amount;
        return acc;
    }, {});

    const sortedBalanceData = Object.values(balanceData).sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sortedBalanceData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
});

export default BalanceOverTime;
