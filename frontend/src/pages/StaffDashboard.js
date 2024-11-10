import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffDashboard.css'; // Ensure you create relevant styles

function StaffDashboard() {
  const [staff, setStaffData] = useState(null); // Initial state is null instead of empty object

  useEffect(() => {
    // Fetch staff data on component mount (use actual endpoint)
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            // Add authorization header if needed
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStaffData(response.data.user);
      } catch (error) {
        console.error('Error fetching staff data:', error);
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

  // Render loading state or staff details if data is available
  if (!staff) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="staff-dashboard">
      <header className="dashboard-header">
        <h2>Welcome, {staff.name}!</h2>
      </header>

      <section className="staff-info">
        <h3>Your Information</h3>
        <ul>
          <li><strong>Name:</strong> {staff.name}</li>
          <li><strong>Staff ID:</strong> {staff.staffId}</li>
          <li><strong>Department:</strong> {staff.department}</li>
          <li><strong>Email:</strong> {staff.email}</li>
        </ul>
      </section>

      <nav className="dashboard-navigation">
        <ul>
          <li><a href="/schedule">Manage Schedule</a></li>
          <li><a href="/classes">Manage Classes</a></li>
          <li><a href="/profile">Profile Settings</a></li>
        </ul>
      </nav>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default StaffDashboard;
