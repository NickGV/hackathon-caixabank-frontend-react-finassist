import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import BalanceChart from './BalanceChart';

function BalanceOverTime() {
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

    return <BalanceChart data={sortedBalanceData} />;
}

export default BalanceOverTime;
