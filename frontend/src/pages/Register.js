import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '', // student or staff
    studentId: '',
    staffId: '',
    department: '', // Department selection for students
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const { role, studentId, staffId, email } = formData;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (role === 'student' && !studentId) {
      alert('Student ID is required for students');
      return;
    }

    if (role === 'staff' && !staffId) {
      alert('Staff ID is required for staff members');
      return;
    }

    // Clear irrelevant ID before submitting
    const submissionData = {
      ...formData,
      studentId: role === 'student' ? formData.studentId : '',
      staffId: role === 'staff' ? formData.staffId : '',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', submissionData);
      alert('Registration successful');
      // Redirect to login page after registration
      window.location.href = '/login';
    } catch (error) {
      alert('Error registering: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        
        {/* Show Department selector if the role is Student */}
        {formData.role === 'student' && (
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        )}
        
        {formData.role === 'student' && (
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            required={formData.role === 'student'}
          />
        )}
        {formData.role === 'staff' && (
          <input
            type="text"
            name="staffId"
            placeholder="Staff ID"
            value={formData.staffId}
            onChange={handleChange}
            required={formData.role === 'staff'}
          />
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
