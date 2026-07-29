import axios from 'axios';

const API = axios.create({
  baseURL: 'https://students-authentication-backend.onrender.com',
});

export default API;
