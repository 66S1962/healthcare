import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Login.css';
import loginImage from '../Images/RM.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that both email and password are entered
    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });

      // Ensure that the response contains the user data
      if (response.data.user) {
        // Ensure that the response contains age, phone, and address from the backend
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Manage login state using Redux
        dispatch({ type: 'user/login/fulfilled', payload: response.data.user });

        alert('Login successful!');
        navigate('/profile'); // Redirect to profile page
      }

    } catch (err) {
      // Handle errors
      alert('Login failed: ' + (err.response?.data?.error || 'Connection error.'));
    }
  };

  return (
    <div className="login-container">
      <img src={loginImage} alt="Hospital Welcome" className="login-top-image" />
      <div className="login-content">
        <h2>Welcome Back!</h2>
        <p>Please login to access your account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
