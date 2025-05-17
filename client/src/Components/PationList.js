import React, { useEffect, useState } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import { FaUserMd, FaRegListAlt, FaCalendarAlt, FaStethoscope, FaRegistered, FaCreditCard, FaSignInAlt, FaSignOutAlt,
  FaWhatsapp, FaTwitter, FaInstagram, FaFacebook, FaPills, FaLaptopMedical } from "react-icons/fa";

import "./Digital.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // To get data sent via state
  const [email, setEmail] = useState(""); // Email address
  const navigate = useNavigate();
    
    
     

  useEffect(() => {
    fetch("http://localhost:3001/api/appointments/all")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // If there is new data coming from Book.js
    if (location.state && location.state.newPatient) {
      setPatients((prevPatients) => [...prevPatients, location.state.newPatient]);
    }
  }, [location.state]); // Check when location.state changes

  return (
    <div className="patient-list-container">
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

      <div className="patient-list-content">
        <h2 className="list-title">Patient List</h2>
        {loading ? (
          <p>Loading patients...</p>
        ) : patients.length === 0 ? (
          <p>No patients booked yet.</p>
        ) : (
          <table className="patient-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Specialty</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient._id || index}>
                  <td>{index + 1}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.date}</td>
                  <td>{patient.time}</td>
                  <td>{patient.reason}</td>
                  <td>{patient.specialty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

export default PatientList;
