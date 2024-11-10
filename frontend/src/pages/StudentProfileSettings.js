import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentProfileSettings.css';

function StudentProfileSettings() {
  const [student, setStudent] = useState({
    name: '',
    studentId: '',
    department: '',
    email: '',
    classYear: '1st year', // Default to 1st year or another valid option
  });

  useEffect(() => {
    // Fetch student data on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStudent({
          name: response.data.user.name || '',
          studentId: response.data.user.studentId || '',
          department: response.data.user.department || '',
          email: response.data.user.email || '',
          classYear: response.data.user.classYear || '1st year', // fallback to default if undefined
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/profile', { email: student.email, classYear: student.classYear }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={student.name} disabled />
        </div>
        <div>
          <label>Student ID:</label>
          <input type="text" value={student.studentId} disabled />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" value={student.department} disabled />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={student.email || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Class Year:</label>
          <select
            name="classYear"
            value={student.classYear || '1st year'}
            onChange={handleInputChange}
          >
            <option value="1st year">1st year</option>
            <option value="2nd year">2nd year</option>
            <option value="3rd year">3rd year</option>
            <option value="4th year">4th year</option>
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default StudentProfileSettings;
