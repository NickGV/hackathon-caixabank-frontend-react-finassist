import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Paper,
    Alert,
} from '@mui/material';

function Settings() {
    const userSettings = useStore(userSettingsStore);
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(userSettings.totalBudgetLimit);
    const [alertsEnabled, setAlertsEnabled] = useState(userSettings.alertsEnabled);
    const [error, setError] = useState("");

    useEffect(() => {
        setTotalBudgetLimit(userSettings.totalBudgetLimit);
        setAlertsEnabled(userSettings.alertsEnabled);
    }, [userSettings]);

    const handleSave = () => {
        if (totalBudgetLimit < 0) {
            setError("Total budget limit must be a positive number.");
            return;
        }

      
        userSettingsStore.set({
            ...userSettings,
            totalBudgetLimit,
            alertsEnabled,
        });

        setError(""); 
    };

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Settings
            </Typography>

            <FormControlLabel
                control={<Switch checked={alertsEnabled} onChange={() => setAlertsEnabled(!alertsEnabled)} color="primary" />}
                label="Enable Alerts"
            />

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Budget Limit (€)</Typography>
                <TextField
                    type="number"
                    value={totalBudgetLimit}
                    onChange={(e) => setTotalBudgetLimit(e.target.value)}
                    fullWidth
                    margin="normal"
                    inputProps={{ min: 0, step: '0.01' }}
                />
            </Paper>

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
            </Box>
        </Box>
    );
}

export default Settings;
