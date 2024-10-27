import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Button,
  Stack,
} from "@mui/material";
import { Facebook, Instagram, Search, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        p: 3,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        "@media (min-width: 600px)": {
          flexDirection: "row",
          justifyContent: "space-between",
          textAlign: "left",
          px: 5,
        },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            p: 1,
          }}
        >
          <IconButton aria-label="search">
            <Search />
          </IconButton>
          <InputBase
            placeholder="Find your branch..."
            sx={{ ml: 1, flex: 1 }}
          />
          <Button type="submit">Search</Button>
        </Paper>
      </Box>

      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <IconButton href="https://facebook.com" aria-label="Facebook">
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com" aria-label="Twitter">
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" aria-label="Instagram">
          <Instagram />
        </IconButton>
      </Stack>

      <Typography variant="body2" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Personal Finance Assistant
      </Typography>
    </Box>
  );
};

export default Footer;
