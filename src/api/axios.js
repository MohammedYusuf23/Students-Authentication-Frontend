import axios from 'axios';

const API = axios.create({
  baseURL: 'https://students-authentication-backend.onrender.com',
  withCredentials: true,
});

export default API;
