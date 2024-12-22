import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../utils/tokenUtils';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(45deg, #6a11cb, #2575fc)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1, fontFamily: 'Roboto, sans-serif' }}>
            User Management
          </Typography>
        </Box>
        <Button
          color="inherit"
          onClick={handleLogout}
          sx={{
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#e52e71',
              color: '#fff',
            },
            padding: '8px 20px',
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
