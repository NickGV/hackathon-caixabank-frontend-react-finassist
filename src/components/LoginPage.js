import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/authStore";
import { Box, Button, TextField, Typography, Alert, Grid } from "@mui/material";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [showCredentials, setShowCredentials] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const defaultCredentials = {
    email: "user@gmail.com",
    password: "password123",
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        (formData.email === defaultCredentials.email &&
          formData.password === defaultCredentials.password) ||
        (storedUser &&
          storedUser.email === formData.email &&
          storedUser.password === formData.password)
      ) {
        await login(formData);
        navigate("/");
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Invalid email or password",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred during login. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
          required
          disabled={isSubmitting}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="normal"
          required
          disabled={isSubmitting}
        />

        {errors.general && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors.general}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Button
            onClick={() => navigate("/register")}
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => navigate("/forgot-password")}
            fullWidth
            variant="text"
          >
            Forgot Password
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
