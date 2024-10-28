import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExportButton from '../ExportButton';

describe('ExportButton Component', () => {
    it('triggers export functionality', () => {
        const mockData = [{ id: 1, name: 'Test' }];
        render(<ExportButton data={mockData} filename="test.csv" headers={['id', 'name']} />);

        fireEvent.click(screen.getByText(/Export CSV/i));
    });
});
