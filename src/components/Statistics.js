import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import StatisticsDisplay from './StatisticsDisplay';

function Statistics() {
    const transactions = useStore(transactionsStore);
    
    const totalIncome = transactions.reduce((total, transaction) => {
        return transaction.type === "income" ? total + transaction.amount : total;
    }, 0);

    const totalExpense = transactions.reduce((total, transaction) => {
        return transaction.type === "expense" ? total + transaction.amount : total;
    }, 0);

    const balance = totalIncome - totalExpense;

    return (
        <StatisticsDisplay totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
    );
}

export default Statistics;
