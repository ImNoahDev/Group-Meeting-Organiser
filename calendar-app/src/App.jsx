// src/App.jsx
import React, { useState, useEffect } from 'react';
import MyCalendar from './components/Calendar';

const App = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const fetchDates = async () => {
    try {
      const response = await fetch('/api/dates');
      if (response.ok) {
        const dates = await response.json();
        setSelectedDates(dates.map((dateStr) => new Date(dateStr)));
      } else {
        console.error('Failed to fetch dates:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching dates:', error);
    }
  };

  const updateDates = async (dates) => {
    try {
      setSelectedDates(dates);
      const response = await fetch('/api/dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dates.map((date) => date.toISOString())),
      });
      if (!response.ok) {
        console.error('Failed to update dates:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating dates:', error);
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-4">Select Your Free Days</h1>
      <MyCalendar selectedDates={selectedDates} onDateChange={updateDates} />
    </div>
  );
};

export default App;
