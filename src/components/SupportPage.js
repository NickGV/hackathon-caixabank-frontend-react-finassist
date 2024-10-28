import React, { useState, useEffect, Profiler, Suspense } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { onRenderCallback } from "../utils/onRenderCallback";

// Componente para el contacto individual (mejora la reusabilidad)
const ContactItem = React.memo(({ user }) => (
  <ListItem sx={{ mb: 2 }}>
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: 'primary.main' }}>{user.name[0]}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user.name}
          <Chip 
            label={user.company.name} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
      }
      secondary={
        <>
          <Typography component="span" variant="body2">
            Email: {user.email}
          </Typography>
          <br />
          <Typography component="span" variant="body2">
            Phone: {user.phone}
          </Typography>
        </>
      }
    />
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        variant="contained"
        color="primary"
        href={`mailto:${user.email}`}
        size="small"
      >
        Email
      </Button>
      <Button
        variant="outlined"
        color="primary"
        href={`tel:${user.phone}`}
        size="small"
      >
        Call
      </Button>
    </Box>
  </ListItem>
));

function SupportPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(`Failed to fetch support contacts: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [retryCount]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          gap: 2
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading support contacts...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          gap: 2
        }}
      >
        <Typography variant="h6" color="error">
          Error loading contacts
        </Typography>
        <Typography color="text.secondary">
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleRetry}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Profiler id="SupportPage" onRender={onRenderCallback}>
      <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Support Contacts
        </Typography>

        <TextField
          label="Search contacts"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name, email, or company..."
          sx={{ mb: 4 }}
        />

        <Suspense fallback={<CircularProgress />}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            {filteredUsers.length > 0 ? (
              <List>
                {filteredUsers.map((user) => (
                  <React.Fragment key={user.id}>
                    <ContactItem user={user} />
                    {user.id !== filteredUsers[filteredUsers.length - 1].id && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography color="text.secondary">
                  No contacts found matching your search criteria.
                </Typography>
              </Box>
            )}
          </Paper>
        </Suspense>
      </Box>
    </Profiler>
  );
}

export default SupportPage;
