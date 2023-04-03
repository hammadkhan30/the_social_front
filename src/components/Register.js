import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Register.css';
const Register = () => {
  console.log('handleSubmit called');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    const userData = {
      name,
      email,
      password,
      age,
      gender,
    };
    try {
      const response = await api.post('/users/register', userData); 
    if (response.status === 200) {
      console.log('Login successful:', userData);
      navigate('/feed');
    } else {
      console.error("error in submitting data",userData);
    }} 
    catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

