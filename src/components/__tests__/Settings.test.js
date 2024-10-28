import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { userSettingsStore } from '../../stores/userSettingsStore';
import Settings from '../Settings';

describe('Settings Component', () => {
    it('updates settings correctly', () => {
        userSettingsStore.set({ totalBudgetLimit: 1000, alertsEnabled: false });

        render(<Settings />);

        fireEvent.change(screen.getByLabelText(/Total Budget Limit/i), { target: { value: 1500 } });
        fireEvent.click(screen.getByText(/Save Settings/i));

        expect(userSettingsStore.get().totalBudgetLimit).toBe(1500);
    });
});
