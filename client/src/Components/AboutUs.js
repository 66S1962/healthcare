import React, { useState , useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserMd, FaRegistered, FaRegListAlt, FaCalendarAlt, FaStethoscope,
  FaLaptopMedical, FaCreditCard, FaSignInAlt, FaSignOutAlt,
  FaWhatsapp, FaTwitter, FaInstagram, FaFacebook, FaPills, FaSearch
} from "react-icons/fa";
import "./Aboutus.css";
import RMImage from '../Images/RM.png';

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

   
  

  const infoTexts = [
    "We provide world-class healthcare services with a focus on patient care.",
    "Our hospital is equipped with modern technology and expert medical staff.",
    "We are committed to improving lives with quality and affordable healthcare.",
    "We are a team of professionals dedicated to providing the best healthcare solutions.",
  ];

  return (
    <div className="aboutus-container">
      {/* Sidebar */}
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

      {/* Search bar with icon */}
      <header className="header">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-bar" />
          <FaSearch className="search-icon" />
        </div>
      </header>

      {/* Main content */}
      <div className="content">
        <div className="text-section">
          <h4 className="welcome-text">Welcome to HealthCare Pro</h4>
          <h1 className="quote">
            "Saving A Life Is Not Just A Mission, It Is a Promise We Live Up To Every Day"
          </h1>
          <div className="info-container">
            <p className="info">{infoTexts[currentIndex]}</p>
            <div className="info-buttons">
              <button onClick={() => setCurrentIndex((currentIndex - 1 + infoTexts.length) % infoTexts.length)}>◀</button>
              <button onClick={() => setCurrentIndex((currentIndex + 1) % infoTexts.length)}>▶</button>
            </div>
          </div>
        </div>

        {/* Image on the right side */}
        <div className="image-section">
          <img src={RMImage} alt="HealthCare Pro" />
        </div>
      </div>

      {/* Footer with social media icons */}
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

export default AboutUs;
