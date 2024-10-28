import React from 'react';
import { render, screen } from '@testing-library/react';
import { transactionsStore } from '../../stores/transactionStore';
import AnalysisGraph from '../AnalysisGraph';

describe('AnalysisGraph Component', () => {
    it('renders the analysis graph correctly', () => {
        transactionsStore.set([
            { id: 1, type: 'income', amount: 100, category: 'Food' },
            { id: 2, type: 'expense', amount: 50, category: 'Food' },
        ]);

        render(<AnalysisGraph />);

        expect(screen.getByText(/Food/)).toBeInTheDocument(); 
    });
});
