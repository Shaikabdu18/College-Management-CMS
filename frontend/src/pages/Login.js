import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ isAdminLogin = false }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: isAdminLogin ? 'admin' : '', // Default to 'admin' if in admin login mode
    id: '', // Only needed for student/staff login
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, role, id } = formData;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (!password) {
      alert('Please enter your password');
      return;
    }

    if (!isAdminLogin) { 
      // Additional validation for student/staff login
      if (!role) {
        alert('Please select your role');
        return;
      }
      if (!id) {
        alert(`Please enter your ${role === 'student' ? 'Student ID' : 'Staff ID'}`);
        return;
      }
    }

    // Convert email to lowercase
    const submissionData = { ...formData, email: email.toLowerCase() };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', submissionData);
      alert('Login successful');
      // Redirect or other actions
    } catch (error) {
      alert('Error logging in: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <h2>{isAdminLogin ? "Admin Login" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {!isAdminLogin && (
          <>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
            <input
              type="text"
              name="id"
              placeholder={formData.role === 'student' ? 'Student ID' : 'Staff ID'}
              value={formData.id}
              onChange={handleChange}
              required
            />
          </>
        )}

        {/* Display role as 'admin' if isAdminLogin is true */}
        {isAdminLogin && (
          <input
            type="text"
            name="role"
            value="admin"
            readOnly
            style={{ display: 'none' }} // Hidden from view
          />
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
