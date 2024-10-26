import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/authStore";
import { Box, Button, TextField, Typography, Alert, Grid } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();

  const defaultCredentials = {
    email: "default@example.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      (email === defaultCredentials.email &&
        password === defaultCredentials.password) ||
      (storedUser &&
        storedUser.email === email &&
        storedUser.password === password)
    ) {
      login({ email, password });
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleShowDefaultCredentials = () => {
    // Show default credentials in case the user requests it
    setEmail(defaultCredentials.email);
    setPassword(defaultCredentials.password);
    setShowCredentials(true);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      {/* Show error message when applicable */}
      {/* - Use the Alert component to display the error message if one exists. */}
      {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Button
            onClick={() => navigate("/register")}
            fullWidth
            variant="outlined"
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleShowDefaultCredentials}
            fullWidth
            variant="text"
          >
            Show Default Credentials
          </Button>
        </Grid>
      </Grid>

      {showCredentials && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>Email:</strong> {defaultCredentials.email}
          <br />
          <strong>Password:</strong> {defaultCredentials.password}
        </Alert>
      )}
    </Box>
  );
}

export default LoginPage;
