import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Book.css';
import profileImage from '../Images/pan.png';
import {
  FaUserMd, FaRegistered, FaRegListAlt, FaCalendarAlt, FaStethoscope,
  FaLaptopMedical, FaCreditCard, FaSignInAlt, FaSignOutAlt,
  FaWhatsapp, FaTwitter, FaInstagram, FaFacebook, FaPills
} from "react-icons/fa";
import Location from './Location';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Email address
    
    
      

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        setFormData(user);  // Set user data to form data for editing
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
  let validationErrors = {};
  if (!formData.name) validationErrors.name = "Name is required";
  if (!formData.email) validationErrors.email = "Email is required";
  if (!formData.phone) validationErrors.phone = "Phone is required";

  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  try {
    const response = await fetch("http://localhost:3001/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData)
    });

    // تحقق من حالة الاستجابة
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);  // تسجيل الخطأ من الخادم
      throw new Error("Failed to update profile");
    }

    const updatedUser = await response.json();
    console.log("Updated user:", updatedUser);  // سجل المستخدم المحدث

    setUserData(updatedUser);
    setIsEditing(false);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error updating profile:", error);  
    alert("حدث خطأ أثناء تحديث الملف الشخصي");
  }
};


  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>

      <div className="profile-content">
        <div className="profile-image-section">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>

        <div className="profile-info-section">
          {userData ? (
            isEditing ? (
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}

                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}

                <label>Age:</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />

                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}

                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <br/>
                <button className="save-button" onClick={handleSave}>Save Changes</button>
              </div>
            ) : (
              <div>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Age:</strong> {userData.age}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Address:</strong> {userData.address}</p>
                <hr />
                <Location />
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              </div>
            )
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>

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

export default Profile;
