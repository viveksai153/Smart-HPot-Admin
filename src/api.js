import axios from 'axios';

const API = axios.create({
    baseURL: 'https://9499-103-95-173-168.ngrok-free.app/logs',
    headers: {
        'ngrok-skip-browser-warning': 'true',  // Bypass ngrok warning
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensure cookies and credentials are sent (if needed)
});

export default API;
