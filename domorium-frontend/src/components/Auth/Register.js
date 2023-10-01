import React, { useState } from 'react';
import api from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login Successful', response.data);
    } catch (error) {
      console.error('Login Error', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
