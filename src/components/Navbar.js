import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Button,
  Badge,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { authStore, logout } from "../stores/authStore";
import { useStore } from "@nanostores/react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const auth = useStore(authStore);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  const navigationLinks = auth.isAuthenticated ? (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 2,
      }}
    >
      <Button color="inherit" component={Link} to="/">
        <DashboardIcon sx={{ mr: 1 }} />
        <span>Dashboard</span>
      </Button>
      <Button color="inherit" component={Link} to="/transactions">
        <ReceiptIcon sx={{ mr: 1 }} />
        <span>Transactions</span>
      </Button>
      <Button color="inherit" component={Link} to="/settings">
        <SettingsIcon sx={{ mr: 1 }} />
        <span>Settings</span>
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        <LogoutIcon sx={{ mr: 1 }} />
        <span>Logout</span>
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 2,
      }}
    >
      <Button color="inherit" component={Link} to="/login">
        <LoginIcon sx={{ mr: 1 }} />
        <span>Login</span>
      </Button>
      <Button color="inherit" component={Link} to="/register">
        <PersonAddIcon sx={{ mr: 1 }} />
        <span>Register</span>
      </Button>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
              display: { md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {!isMobile && <AccountBalanceIcon />}
            {isMobile ? "FA" : "Finance App"}
          </Typography>

          {navigationLinks}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
            }}
          >
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Badge color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {auth.isAuthenticated && auth.user && (
              <Avatar
                sx={{
                  width: { xs: 32, md: 40 },
                  height: { xs: 32, md: 40 },
                }}
                alt={auth.user.email}
                title={auth.user.email}
              >
                {auth.user.email.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 250 },
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            pt: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {auth.isAuthenticated && auth.user && (
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Avatar>{auth.user.email.charAt(0).toUpperCase()}</Avatar>
              <Typography variant="subtitle1">{auth.user.email}</Typography>
            </Box>
          )}

          <List sx={{ flex: 1 }}>
            {auth.isAuthenticated ? (
              <>
                <ListItem
                  button
                  component={Link}
                  to="/"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/transactions"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/settings"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  button
                  component={Link}
                  to="/login"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/register"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>

          <List>
            <ListItem button onClick={toggleTheme}>
              <ListItemIcon>
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </ListItemIcon>
              <ListItemText primary={`${isDarkMode ? "Light" : "Dark"} Mode`} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
