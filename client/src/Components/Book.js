import React, { useState, useEffect } from "react";
import "./Book.css";
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserMd, FaRegistered, FaRegListAlt, FaCalendarAlt, FaStethoscope,
  FaLaptopMedical, FaCreditCard, FaSignInAlt, FaSignOutAlt,
  FaWhatsapp, FaTwitter, FaInstagram, FaFacebook, FaPills
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Book = () => {
  const user = useSelector((state) => state.user?.user); // ✅ التصحيح هنا
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    reason: "",
    specialty: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ تعبئة بيانات المستخدم تلقائيًا
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.name || !formData.date || !formData.time || !formData.reason || !formData.specialty) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage("Appointment booked and saved to database successfully!");
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          date: "",
          time: "",
          reason: "",
          specialty: ""
        });
        setError("");
        navigate('/reports', { state: { appointmentData: formData } });
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save appointment.");
      }
    } catch (error) {
      setError("Error occurred while booking appointment.");
    }
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

      <h2 className="book-title">Book an Appointment</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={formData.date}
          required
        />
        <input
          type="time"
          name="time"
          onChange={handleChange}
          value={formData.time}
          required
        />
        <textarea
          name="reason"
          placeholder="Reason for Appointment"
          onChange={handleChange}
          value={formData.reason}
          required
        ></textarea>

        <select
          name="specialty"
          onChange={handleChange}
          value={formData.specialty}
          required
        >
          <option value="">Select Specialty</option>
          <option value="general">General Practitioner</option>
          <option value="cardiology">Cardiology</option>
          <option value="dermatology">Dermatology</option>
          <option value="pediatrics">Pediatrics</option>
        </select>

        <button type="submit" className="book-button">Book Now</button>
      </form>

      <footer className="footer">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      </footer>
    </div>
  );
};

export default Book;
