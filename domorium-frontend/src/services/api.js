import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3200', // Remplacez par l'URL de votre API
});

export default api;
