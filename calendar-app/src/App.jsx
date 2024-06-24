// src/App.js
import React, { useState, useEffect } from 'react';
import MyCalendar from './components/Calendar';

const App = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const fetchDates = async () => {
    // Fetch selected dates from the backend
    const response = await fetch('/api/dates');
    const dates = await response.json();
    setSelectedDates(dates.map(date => new Date(date)));
  };

  const updateDates = async (date) => {
    // Update selected dates to the backend
    const updatedDates = [...selectedDates, date];
    setSelectedDates(updatedDates);
    await fetch('/api/dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDates),
    });
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
