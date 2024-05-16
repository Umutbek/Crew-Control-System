import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login'); // Redirect to login after logout
  };

  const handleManageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleManageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleManageNavigation = (path) => {
    handleManageMenuClose();
    navigate(path);
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
          GreenCrew
        </Typography>
        <Button
          color="inherit"
          onClick={handleManageMenuOpen}
        >
          Manage
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleManageMenuClose}
        >
          <MenuItem onClick={() => handleManageNavigation('/manage-crew')}>Crew</MenuItem>
          <MenuItem onClick={() => handleManageNavigation('/manage-crew-members')}>Crew Members</MenuItem>
          <MenuItem onClick={() => handleManageNavigation('/manage-customers')}>Customers</MenuItem>
        </Menu>
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
