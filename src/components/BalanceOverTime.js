import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import BalanceChart from './BalanceChart';

function BalanceOverTime() {
    const transactions = useStore(transactionsStore);
    const data = [];
    return <BalanceChart data={data} />;
}

export default BalanceOverTime;
