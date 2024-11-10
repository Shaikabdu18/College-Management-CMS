import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageSchedule.css';

function ManageSchedule() {
  const [schedule, setSchedule] = useState({
    monday: ['', '', '', '', '', ''],
    tuesday: ['', '', '', '', '', ''],
    wednesday: ['', '', '', '', '', ''],
    thursday: ['', '', '', '', '', ''],
    friday: ['', '', '', '', '', ''],
  });

  useEffect(() => {
    // Fetch existing schedule from backend (replace with actual API)
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schedule', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSchedule(response.data.schedule); // Adjust as per your backend response structure
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
    fetchSchedule();
  }, []);

  const handleInputChange = (e, day, index) => {
    const { value } = e.target;
    const updatedSchedule = { ...schedule };
    updatedSchedule[day][index] = value;
    setSchedule(updatedSchedule);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit updated schedule to backend (replace with actual API)
    try {
      await axios.put('http://localhost:5000/api/schedule', schedule, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Schedule updated successfully');
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  return (
    <div className="manage-schedule">
      <h2>Manage Schedule</h2>

      <form onSubmit={handleSubmit}>
        <div className="weekdays">
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day, index) => (
            <div className="day" key={index}>
              <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
              {schedule[day].map((subject, i) => (
                <div className="subject-box" key={i}>
                  <input
                    type="text"
                    placeholder={`Subject ${i + 1}`}
                    value={subject}
                    onChange={(e) => handleInputChange(e, day, i)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <button type="submit">Save Schedule</button>
      </form>
    </div>
  );
}

export default ManageSchedule;
