import React from 'react';
import { render, screen } from '@testing-library/react';
import { transactionsStore } from '../../stores/transactionStore';
import BalanceOverTime from '../BalanceOverTime';

describe('BalanceOverTime Component', () => {
    it('renders the balance line chart correctly', () => {
        transactionsStore.set([
            { id: 1, type: 'income', amount: 100, date: '2023-01-01' },
            { id: 2, type: 'expense', amount: 50, date: '2023-01-02' },
        ]);

        render(<BalanceOverTime />);

        expect(screen.getByText(/January/)).toBeInTheDocument(); 
    });
});
