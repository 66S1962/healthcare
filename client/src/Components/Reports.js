import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Reports.css';
import {
  FaUserMd, FaRegistered, FaRegListAlt, FaCalendarAlt, FaStethoscope,
  FaLaptopMedical, FaCreditCard, FaSignInAlt, FaSignOutAlt,
  FaWhatsapp, FaTwitter, FaInstagram, FaFacebook, FaPills
} from "react-icons/fa";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [appointmentData, setAppointmentData] = useState(null); // ✅ تم إضافة المتغير

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to view reports.");
      setLoading(false);
      navigate('/login');
      return;
    }

    // جلب بيانات التقارير
    axios.get('http://localhost:3001/reports', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setReports(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching reports", error);
        setErrorMessage('Failed to fetch reports.');
        setLoading(false);
      });

    // ✅ جلب بيانات الموعد من الموقع
    if (location.state && location.state.appointmentData) {
      setAppointmentData(location.state.appointmentData);
    }
  }, [navigate, location.state]);

  const generatePDF = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Medical Report', 20, 20);

    const data = [
      ['Patient Name', report.patientName],
      ['Date', new Date(report.reportDate).toLocaleDateString()],
      ['Diagnosis', report.diagnosis],
      ['Prescription', report.prescription],
      ['Medications', report.medications.join(', ')],
    ];

    doc.autoTable({
      startY: 30,
      head: [['Information', 'Value']],
      body: data,
    });

    doc.save(`Medical_Report_${report.patientName}.pdf`);
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className="reports-container">
      <h2 className="reports-title">Medical Reports</h2>

      <aside className="sidebar">
        <h2 className="sidebar-title">HealthCare Pro</h2>
        <ul className="sidebar-links">
          <li><Link to="/"><span className="icon"><FaUserMd /></span> About Us</Link></li>
          <li><Link to="/profile"><span className="icon"><FaLaptopMedical /></span> Profile</Link></li>
          <li><Link to="/PatientList"><span className="icon"><FaRegListAlt /></span> Patient List</Link></li>
          <li><Link to="/book-appointment"><span className="icon"><FaCalendarAlt /></span> Book Appointments</Link></li>
          <li><Link to="/consultation"><span className="icon"><FaStethoscope /></span> Medical Consultation</Link></li>
          <li><Link to="/reports"><span className="icon"><FaRegListAlt /></span> Reports</Link></li>
          <li><Link to="/Pharmcy"><span className="icon"><FaPills /></span> Pharmacy</Link></li>
          <li><Link to="/payment"><span className="icon"><FaCreditCard /></span> Payment</Link></li>
          <li><Link to="/login"><span className="icon"><FaSignInAlt /></span> Login</Link></li>
          <li><Link to="/register"><span className="icon"><FaRegistered /></span> Register</Link></li>
          <li><Link to="/logout"><span className="icon"><FaSignOutAlt /></span> Logout</Link></li>
        </ul>
      </aside>

      {/* ✅ عرض تفاصيل الموعد إذا توفرت */}
      {appointmentData && (
        <div className="appointment-details">
          <p><strong>Patient Name:</strong> {appointmentData.name}</p>
          <p><strong>Email:</strong> {appointmentData.email}</p>
          <p><strong>Date:</strong> {appointmentData.date}</p>
          <p><strong>Time:</strong> {appointmentData.time}</p>
          <p><strong>Reason for Appointment:</strong> {appointmentData.reason}</p>
          <p><strong>Specialty:</strong> {appointmentData.specialty}</p>
        </div>
      )}

      <div className="print-button-container">
        <button onClick={printPage} className="print-page-btn">Print Page</button>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      ) : reports.length === 0 && !appointmentData ? (
        <p className="error-message">{errorMessage || "No reports to display."}</p>
      ) : (
        <ul className="reports-list">
          {reports.map((report) => (
            <li key={report._id} className="report-card">
              <div className="report-info">
                <p><strong>Patient Name:</strong> {report.patientName}</p>
                <p><strong>Date:</strong> {new Date(report.reportDate).toLocaleDateString()}</p>
                <p><strong>Diagnosis:</strong> {report.diagnosis}</p>
                <p><strong>Prescription:</strong> {report.prescription}</p>
                <p><strong>Medications:</strong> {report.medications.join(', ')}</p>
              </div>
              <div className="actions">
                <button className="view-report-btn" onClick={() => navigate(`/report/${report._id}`)}>View Report</button>
                <button className="print-report-btn" onClick={() => generatePDF(report)}>Download PDF</button>
                <button className="book-appointment-btn" onClick={() => navigate(`/book-appointment/${report._id}`)}>Book Appointment</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="footer">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </footer>
    </div>
  );
};

export default Reports;
