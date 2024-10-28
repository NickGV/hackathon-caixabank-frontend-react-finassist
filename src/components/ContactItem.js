import React from "react";
import {
  Box,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Button,
  Typography,
} from "@mui/material";

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

export default ContactItem;
