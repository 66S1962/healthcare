import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Book.css';

import {
  FaUserMd, FaRegistered, FaRegListAlt, FaCalendarAlt, FaStethoscope,
  FaLaptopMedical, FaCreditCard, FaSignInAlt, FaSignOutAlt,
  FaWhatsapp, FaTwitter, FaInstagram, FaFacebook, FaPills
} from "react-icons/fa";

const Payment = () => {
  const { state } = useLocation();
  const medications = state?.medications || [];

  const total = medications.reduce((sum, med) => sum + (med.price || 0), 0);
  const taxRate = 0.05;
  const taxAmount = total * taxRate;
  const finalAmount = total + taxAmount;

  const [email, setEmail] = useState(""); // Email address
  
    
    
     

  const handlePrint = () => {
    window.print();
  };

  const navigate = useNavigate();
  const user = { email: 'user@example.com' }; 

  return (
    <Container fluid>
      <Row className="justify-content-center my-4">
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

        <Col md={9}>
          <div className="payment-summary">
            <h2 className="mb-4 text-center">💊 Payment Summary</h2>

            {medications.length > 0 ? (
              <>
                <Table striped bordered hover className="text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Medication Name</th>
                      <th>Price (OMR)</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((med, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{med.name}</td>
                        <td>{med.price?.toFixed(3)}</td>
                        <td>{med.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="text-end pe-4">
                  <p><strong>Subtotal:</strong> {total.toFixed(3)} OMR</p>
                  <p><strong>Tax (5%):</strong> {taxAmount.toFixed(3)} OMR</p>
                  <p><strong>Total Amount:</strong> {finalAmount.toFixed(3)} OMR</p>
                </div>

                <div className="mt-4 no-print d-flex justify-content-center gap-2">
                  <Button variant="secondary" onClick={handlePrint}>🖨️ Print Invoice</Button>
                </div>

                <div className="mt-5 print-only">
                  <p><strong>Doctor's Signature:</strong></p>
                  <p style={{ marginTop: "40px" }}>__________________________</p>
                </div>
              </>
            ) : (
              <p className="text-center">No medications selected.</p>
            )}
          </div>
        </Col>
      </Row>

      <footer className="footer text-center no-print">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </footer>
    </Container>
  );
};

export default Payment;
