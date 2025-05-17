import React, { useState,useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import {
  FaUserMd, FaRegistered, FaRegListAlt, FaCalendarAlt, FaStethoscope,
  FaCreditCard, FaSignInAlt, FaSignOutAlt, FaWhatsapp, FaTwitter,
  FaInstagram, FaFacebook, FaPills,FaLaptopMedical
} from "react-icons/fa";
import './Midecal.css';

const Medical= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    message: '',
  });
  const [email, setEmail] = useState(""); // Email address
    const navigate = useNavigate();
  
  
    useEffect(() => {
      if (!email) {
        navigate("/login");
      }
    }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Medical consultation submitted successfully!");
    // Send data to backend here if needed
    setFormData({ name: '', email: '', specialty: '', message: '' }); // Reset form
  };

  return (
    <div className="medical-consultation-container">
       <aside className="sidebar">
                     <h2 className="sidebar-title">HealthCare Pro</h2>
                     <ul className="sidebar-links">
                       <li><Link to="/"><FaUserMd /> About Us</Link></li>
                       <li><Link to="/profile"><FaLaptopMedical /> Profile</Link></li>
                       <li><Link to="/PatientList"><FaRegListAlt /> Patient List1</Link></li>
                       <li><Link to="/book-appointment"><FaCalendarAlt /> Book Appointments</Link></li>
                       <li><Link to="/consultation"><FaStethoscope /> Medical Consultation</Link></li>
                       <li><Link to="/reports"><FaRegListAlt /> Reports</Link></li>
                       <li><Link to="/Pharmcy"><FaPills /> Pharmacy</Link></li>
                       <li><Link to="/payment"><FaCreditCard /> Payment</Link></li>
                       <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
                       <li><Link to="/register"><FaRegistered /> Register</Link></li>
                       <li><Link to="/logout"><FaSignOutAlt /> Logout</Link></li>
                     </ul>
                   </aside>

      <div className="content">
        <div className="form-container">
          <h2>Book Your Medical Consultation</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Medical Specialty</label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Specialty</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                required
              />
            </div>

            <button type="submit" className="submit-btn">Submit Consultation</button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </footer>
    </div>
  );
};

export default Medical;
