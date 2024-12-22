import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import { Box, Grid, Card, CardContent, Typography, Button, Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers(page);
            setUsers(response.data.data);
            setTotalPages(response.data.total_pages);
        };
        fetchUsers();
    }, [page]);

    const handleDeleteClick = (id, name) => {
        setSelectedUserId(id);
        setSelectedUserName(name);
        setOpenModal(true);
    };

    const handleDeleteConfirm = async () => {
        await deleteUser(selectedUserId);
        setUsers(users.filter((user) => user.id !== selectedUserId));
        setOpenModal(false);
    };

    const handleDeleteCancel = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 4 }}>
                <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
                    {users.map((user) => (
                        <Grid item xs={12} md={4} key={user.id}>
                            <Card
                                sx={{
                                    maxWidth: 390,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    transition: 'transform 0.2s ease, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Avatar
                                        src={user.avatar}
                                        sx={{
                                            width: 96,
                                            height: 96,
                                            margin: 'auto',
                                            mb: 2,
                                            border: '4px solid #1976d2',
                                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {`${user.first_name} ${user.last_name}`}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                                        {user.email}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteClick(user.id, `${user.first_name} ${user.last_name}`)}
                                            sx={{
                                                backgroundColor: '#F4C2C2',
                                                '&:hover': { backgroundColor: '#9a0007' },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/edit/${user.id}`)}
                                            sx={{
                                                backgroundColor: '#AFDBF5',
                                                '&:hover': { backgroundColor: '#115293' },
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Pagination page={page} onChange={setPage} totalPages={totalPages} sx={{ mt: 4 }} />
            </Box>

            {/*  Modal */}
            <Dialog open={openModal} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{`Are you sure you want to delete ${selectedUserName}?`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserList;
