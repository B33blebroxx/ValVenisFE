import axios from 'axios';

const apiBaseURL = 'https://localhost:7067'; // Ensure this matches your backend URL

const client = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a response interceptor
client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default client;
