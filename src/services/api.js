import axios from 'axios';

const api = axios.create({
  baseURL: 'http://0.0.0.0:3000/api/v1',
});

export default api;
