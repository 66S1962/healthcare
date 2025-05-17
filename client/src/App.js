import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AboutUs from './Components/AboutUs';
import Book from './Components/Book';
import Payment from './Components/payment';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Register from './Components/Register';
import PationList from './Components/PationList';
import Profile from './Components/Profile';
import Reports from './Components/Reports';
import ProtectedRoute from './Components/ProtectedRoute';
import Pharmcy from './Components/Pharmcy';
import Medical from './Components/Medical';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'user/login/fulfilled', payload: JSON.parse(storedUser) });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container fluid>
        <Row className="main">
          <Routes>
            <Route path="/" element={<AboutUs />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/consultation" element={<ProtectedRoute><Medical/></ProtectedRoute>} />


            <Route path="/book-appointment" element={<ProtectedRoute><Book /></ProtectedRoute>} />
            <Route path="/pharmcy" element={<ProtectedRoute><Pharmcy /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/PatientList" element={<ProtectedRoute><PationList /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
