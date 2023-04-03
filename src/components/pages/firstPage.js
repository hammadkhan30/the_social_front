import React from 'react';
import { Link } from 'react-router-dom';
import './firstPage.css';
import logo from '../../assets/logo_the_social.png';

const firstPage = () => {
  return (
    <div className="landing-container">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="buttons-container">
        <Link to="/login" className="landing-button">Login</Link>
        <Link to="/register" className="landing-button">Register</Link>
      </div>
    </div>
  );
};

export default firstPage;

