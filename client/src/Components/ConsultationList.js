import React, { useState, useEffect } from 'react';
import "./Book.css";
import {
  FaUserMd, FaRegistered, FaRegListAlt, FaCalendarAlt, FaStethoscope,
  FaLaptopMedical, FaCreditCard, FaSignInAlt, FaSignOutAlt,
  FaWhatsapp, FaTwitter, FaInstagram, FaFacebook, FaPills
} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const ConsultationList = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState(""); // User name
  const [email, setEmail] = useState(""); // Email address
  const [message, setMessage] = useState(""); // User message

  const [user, setUser] = useState(null); // Assume you have a way to represent the user
  const navigate = useNavigate(); // Using useNavigate

  

  
  

  const consultations = [
    { id: 1, patient: "Esraa", date: "2025-04-12", doctor: "Dr. Omar", status: "Completed" },
    { id: 2, patient: "Laila", date: "2025-04-15", doctor: "Dr. Sara", status: "Upcoming" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");

    // Hide confirmation after 4 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="book-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">HealthCare Pro</h2>
        <ul className="sidebar-links">
          <li><Link to="/"><FaUserMd /> About Us</Link></li>
          <li><Link to="/profile"><FaLaptopMedical /> Profile</Link></li>
          <li><Link to="/PatientList"><FaRegListAlt /> Patient List</Link></li>
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

      <main className="consultation-content">
        <section className="contact-us-modern">
          {formSubmitted && (
            <p className="confirmation-message" style={{ color: 'green', fontWeight: 'bold' }}>
              ✅ Your message has been sent successfully!
            </p>
          )}

          <h1>Contact Our Clinic</h1>
          <p>If you have any questions or need assistance, feel free to reach out to our medical team.</p>

          <form className="contact-form-modern" onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUserMd className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaRegListAlt className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaStethoscope className="input-icon" />
              <textarea
                placeholder="Your Message or Inquiry"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </footer>
    </div>
  );
};

export default ConsultationList;
