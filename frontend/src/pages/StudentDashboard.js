// src/pages/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css'; // Ensure you create relevant styles

function StudentDashboard() {
  const [student, setStudentData] = useState({
    name: '',
    studentId: '',
    department: '',
    email: '',
  });
  

  useEffect(() => {
    // Fetch student data on component mount (use actual endpoint)
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            // Add authorization header if needed
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStudentData(response.data.user);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    // Clear token or any session data
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h2>Welcome, {student.name}!</h2>
        
      </header>

      <section className="student-info">
        <h3>Your Information</h3>
        <ul>
          <li><strong>Name:</strong> {student.name}</li>
          <li><strong>Student ID:</strong> {student.studentId}</li>
          <li><strong>Department:</strong> {student.department}</li>
          <li><strong>Email:</strong> {student.email}</li>
        </ul>
      </section>

      <nav className="dashboard-navigation">
        <ul>
          <li><a href="/classes">My Classes</a></li>
          <li><a href="/grades">View Grades</a></li>
          <li><a href="/attendance">Attendance</a></li>
          <li><a href="/profile">Profile Settings</a></li>
        </ul>
      </nav>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;
