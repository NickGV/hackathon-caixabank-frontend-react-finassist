import React from 'react';
import { render, screen } from '@testing-library/react';
import { transactionsStore } from '../../stores/transactionStore';
import RecentTransactions from '../RecentTransactions';

describe('RecentTransactions Component', () => {
    it('displays recent transactions correctly', () => {
        transactionsStore.set([
            { id: 1, description: 'Transaction 1', amount: 100, date: '2023-01-01' },
            { id: 2, description: 'Transaction 2', amount: 50, date: '2023-01-02' },
        ]);

        render(<RecentTransactions />);

        expect(screen.getByText(/Transaction 1/)).toBeInTheDocument();
        expect(screen.getByText(/Transaction 2/)).toBeInTheDocument();
    });
});
