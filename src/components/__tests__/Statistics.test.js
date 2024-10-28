import React from 'react';
import { render, screen } from '@testing-library/react';
import { transactionsStore } from '../../stores/transactionStore';
import Statistics from '../Statistics';

describe('Statistics Component', () => {
    it('displays total income, total expense, and balance correctly', () => {
        transactionsStore.set([
            { id: 1, type: 'income', amount: 100 },
            { id: 2, type: 'expense', amount: 50 },
        ]);

        render(<Statistics />);

        expect(screen.getByText(/Total Income:/)).toHaveTextContent('Total Income: €100.00');
        expect(screen.getByText(/Total Expenses:/)).toHaveTextContent('Total Expenses: €50.00');
        expect(screen.getByText(/Balance:/)).toHaveTextContent('Balance: €50.00');
    });
});
