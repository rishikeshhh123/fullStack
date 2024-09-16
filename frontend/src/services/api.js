import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = async (data) => {
    return await axios.post(`${API_URL}/auth/signup`, data);
};

export const login = async (data) => {
    return await axios.post(`${API_URL}/auth/login`, data);
};

export const addFriend = async (token, friendId) => {
    return await axios.post(`${API_URL}/friends/add`, { friendId }, {
        headers: { Authorization: token },
    });
};

export const getRecommendations = async (token) => {
    return await axios.get(`${API_URL}/friends/recommendations`, {
        headers: { Authorization: token },
    });
};
