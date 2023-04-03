import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/users/signIn', {
        email,
        password,
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        console.log('Login successful:', data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token); // Store the token separately
        navigate('/feed');
      } else {
        console.error('Login failed:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className='container'>
      <form className="login-form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;



