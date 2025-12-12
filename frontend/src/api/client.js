import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/api';

const BASE_URL = 'https://scriptysiddharthnama.pythonanywhere.com//api';

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        client.defaults.headers.common['Authorization'] = `Token ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete client.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

export default client;
