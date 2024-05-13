// src/components/Navbar.js
import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ marginRight: 4 }}>
          Project Name
        </Typography>
        <Button color="inherit" onClick={() => handleNavigation('/manage')}>Manage</Button>
        <Button color="inherit" onClick={() => handleNavigation('/reports')}>Reports</Button>
        <Button color="inherit" onClick={() => handleNavigation('/billing')}>Billing</Button>
        <div style={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={() => handleNavigation('/settings')}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleLogout}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
