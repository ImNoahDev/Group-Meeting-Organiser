// src/components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ selectedDates, onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleChange = (date) => {
    setDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <Calendar
        onChange={handleChange}
        value={date}
        tileClassName={({ date, view }) =>
          selectedDates.find((d) => d.getTime() === date.getTime())
            ? 'bg-blue-500 text-white'
            : ''
        }
      />
    </div>
  );
};

export default MyCalendar;
