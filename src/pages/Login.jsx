import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/users'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          backgroundColor: 'white',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', 
          transform: 'perspective(800px) rotateX(10deg) rotateY(12deg)', 
          transition: 'all 0.3s ease-in-out', 
          '&:hover': {
            boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.3)', 
            transform: 'perspective(800px) rotateX(5deg) rotateY(0deg)', 
          },
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Login
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 10,
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 10,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              padding: '12px',
              fontWeight: 'bold',
              fontSize: '1rem',
              background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
              '&:hover': {
                background: 'linear-gradient(90deg, #e52e71, #ff8a00)',
              },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
