import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout immediately upon page load
    localStorage.removeItem('user'); // Remove user data
    localStorage.removeItem('role'); // Remove role if you're using it
    localStorage.removeItem('email'); // Or any additional data
    localStorage.removeItem('name'); // Remove user-specific data

    navigate('/login'); // Redirect to the login page
  }, [navigate]);

  return null; // No need to render any content
};

export default Logout;
