import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, CircularProgress, Avatar, Grid } from '@mui/material';
import { getUserById, updateUser } from '../services/api';
import { getUsers } from '../services/api';

const EditUser = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserById(id);
                const user = response.data.data;
                setUserData({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    avatar: user.avatar,
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await updateUser(id, userData);
            //   const updatedUsers = await getUsers(1);
            //   navigate('/users', { state: { users: updatedUsers.data.data } }); 
            navigate("/users");
        } catch (err) {
            setError('Error updating user');
        }
    };

    const handleCancel = () => {
        navigate('/users');
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: 'auto',
                mt: 4,
                mb: 4,
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
                Edit User
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" sx={{ textAlign: 'center' }}>
                    {error}
                </Typography>
            ) : (
                <>
                    <Grid container justifyContent="center" sx={{ mb: 4 }}>
                        <Avatar
                            src={userData.avatar}
                            sx={{
                                width: 120,
                                height: 120,
                                border: '4px solid #1976d2',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </Grid>

                    <TextField
                        fullWidth
                        label="First Name"
                        value={userData.first_name}
                        onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
                        sx={{ mb: 2 }}
                        variant="outlined"
                        color="primary"
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={userData.last_name}
                        onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
                        sx={{ mb: 2 }}
                        variant="outlined"
                        color="primary"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        sx={{ mb: 2 }}
                        variant="outlined"
                        color="primary"
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                            sx={{
                                padding: '14px',
                                fontSize: '16px',
                                width: '48%',
                                borderColor: '#1976d2',
                                color: '#1976d2',
                                '&:hover': { borderColor: '#115293', color: '#115293' },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleUpdate}
                            sx={{
                                backgroundColor: '#1976d2',
                                '&:hover': { backgroundColor: '#115293' },
                                padding: '14px',
                                fontSize: '16px',
                                width: '48%',
                            }}
                        >
                            Update
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default EditUser;
