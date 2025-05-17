import React, { useState, useEffect } from "react";
import "./Digital.css";
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserMd, FaCalendarAlt, FaRegListAlt, FaPills, FaStethoscope,
  FaLaptopMedical, FaCreditCard, FaSignInAlt, FaSignOutAlt,
  FaRegistered, FaPrint, FaEnvelope
} from "react-icons/fa";

import BepanthenImg from "../Images/B.jpg";
import SugarDeviceImg from "../Images/bb.jpg";
import CamoleumImg from "../Images/Ca.jpg";
import ContraImg from "../Images/co.jpg";
import FludrexImg from "../Images/fluderx.jpg";
import HansaplastImg from "../Images/H.jpg";
import KlearImg from "../Images/k.jpg";
import MeboImg from "../Images/M.jpg";
import OlmepressImg from "../Images/Olm.jpg";
import VitaminOmegaImg from "../Images/p2.jpg";
import ColchicineImg from "../Images/p11.jpg";
import PressureDeviceImg from "../Images/pp.jpg";

const medications = [
  { id: 1, name: "Bepanthen", price: "1.200", description: "Pain reliever and fever reducer.", image: BepanthenImg },
  { id: 2, name: "Sugar measuring device", price: "2.800", description: "For asthma and respiratory relief.", image: SugarDeviceImg },
  { id: 3, name: "Camoleum", price: "1.000", description: "Allergy relief medication.", image: CamoleumImg },
  { id: 4, name: "Contra", price: "0.800", description: "Used for mild to moderate pain.", image: ContraImg },
  { id: 5, name: "Fludrex", price: "2.000", description: "Antibiotic for various infections.", image: FludrexImg },
  { id: 6, name: "Hansaplast", price: "0.900", description: "Used to reduce pain and fever.", image: HansaplastImg },
  { id: 7, name: "Klear", price: "1.300", description: "Non-drowsy antihistamine for allergies.", image: KlearImg },
  { id: 8, name: "Mebo", price: "1.700", description: "Relieves joint and muscle pain.", image: MeboImg },
  { id: 9, name: "Olmepress", price: "2.200", description: "Topical pain relief gel.", image: OlmepressImg },
  { id: 10, name: "Vitamin Omega", price: "1.400", description: "Treats acid reflux and ulcers.", image: VitaminOmegaImg },
  { id: 11, name: "Colchicine", price: "1.100", description: "Used to relieve constipation.", image: ColchicineImg },
  { id: 12, name: "Pressure measuring device", price: "2.000", description: "For skin irritation and rashes.", image: PressureDeviceImg },
];

export default function Pharmacy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [prescription, setPrescription] = useState([]);
  const [patientEmail, setPatientEmail] = useState("");
  const [user, setUser] = useState(null); // Assuming user data will be set here or fetched
  const navigate = useNavigate();
const [email, setEmail] = useState(""); // Email address
  
  
    
  

  const filteredMedications = medications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrescribe = (med) => {
    if (!prescription.some(item => item.id === med.id)) {
      setPrescription([...prescription, { ...med, date: new Date().toLocaleString() }]);
    }
  };

  const handleRemove = (id) => {
    setPrescription(prescription.filter(item => item.id !== id));
  };

  const handlePrint = () => {
    const confirmed = window.confirm("Are you sure you want to print the prescription?");
    if (!confirmed) return;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<h2>Prescription</h2>`);
    prescription.forEach((item) => {
      newWindow.document.write(`
        <p>
          <strong>${item.name}</strong> - ${item.price} OMR<br/>
          ${item.description}<br/>
          <em>Date: ${item.date}</em>
        </p>
        <hr/>
      `);
    });
    newWindow.print();
    newWindow.close();
  };

  const handleSendEmail = () => {
    if (!patientEmail) {
      alert("Please enter the patient's email.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to send the prescription?");
    if (!confirmed) return;

    const body = prescription.map(item =>
      `${item.name} - ${item.price} OMR\n${item.description}\nDate: ${item.date}` 
    ).join("\n\n");

    window.location.href = `mailto:${patientEmail}?subject=Prescription&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="pharmacy-layout">
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

      <div style={{ display: "flex", flex: 1 }}>
        <main className="main-content with-summary">
          <h1 className="title">Available Medications</h1>
          <input
            type="text"
            placeholder="Search for medication..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="medication-grid">
            {filteredMedications.length > 0 ? (
              filteredMedications.map((med) => (
                <div key={med.id} className="med-card">
                  <img src={med.image} alt={med.name} className="med-image" />
                  <h2>{med.name}</h2>
                  <p>{med.description}</p>
                  <p className="price">{med.price} OMR</p>
                  <button className="prescribe-button" onClick={() => handlePrescribe(med)}>Prescribe</button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>No medication found.</p>
            )}
          </div>
        </main>

        {prescription.length > 0 && (
          <div className="summary-panel">
            <h3 className="summary-title">🩺 Selected Prescription</h3>
            <ul className="prescription-list">
              {prescription.map((item) => (
                <li key={item.id} className="prescribed-item">
                  <span>{item.name}</span>
                  <button onClick={() => handleRemove(item.id)} className="delete-btn">×</button>
                </li>
              ))}
            </ul>

            <input
              type="email"
              placeholder="Patient's email"
              className="email-input"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />

            <div className="btns">
              <button onClick={handleSendEmail} className="btn blue"><FaEnvelope className="inline mr-2" />Send Email</button>
              <button onClick={handlePrint} className="btn gray"><FaPrint className="inline mr-2" />Print Prescription</button>
              <button
                className="btn green"
                onClick={() => navigate('/payment', {
                  state: {
                    medications: prescription.map(item => ({
                      name: item.name,
                      price: parseFloat(item.price),
                      date: item.date
                    }))
                  }
                })}
              >
                💳 Go to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
