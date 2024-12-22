import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response;
  } catch (error) {
    throw new Error('Error during login');
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

export const getUsers = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    return response;
  } catch (error) {
    throw new Error('Error fetching users data');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    return response;
  } catch (error) {
    throw new Error('Error updating user data');
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};
