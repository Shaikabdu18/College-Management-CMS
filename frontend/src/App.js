// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import ManageSchedule from './pages/ManageSchedule';
import StudentProfileSettings from './pages/StudentProfileSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<Login isAdminLogin={true} />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/schedule" element={<ManageSchedule />} />
        <Route path="/profile" element={<StudentProfileSettings />} />





        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
