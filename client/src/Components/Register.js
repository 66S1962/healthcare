import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { userSchemaValidation } from '../Validations/UserValidations';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    try {
      await userSchemaValidation.validate(form, { abortEarly: false });
    } catch (err) {
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const dataToSend = { ...form, role: 'patient' };

    try {
      const response = await axios.post('http://localhost:3001/registerPatient', dataToSend);
      if (response.data.success) {
        alert("Patient registered successfully!");
        navigate('/login');
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Registration failed'));
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Patient Registration</h2>

        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <span className="error">{errors.password}</span>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        <input type="text" name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        {errors.age && <span className="error">{errors.age}</span>}

        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        {errors.address && <span className="error">{errors.address}</span>}

        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
