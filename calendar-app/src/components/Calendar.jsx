// src/components/Calendar.jsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ selectedDates, onDateChange }) => {
  const handleDateClick = (date) => {
    const dateIndex = selectedDates.findIndex(
      (selectedDate) => selectedDate.getTime() === date.getTime()
    );

    if (dateIndex > -1) {
      // Date is already selected, remove it
      const newDates = selectedDates.filter(
        (selectedDate) => selectedDate.getTime() !== date.getTime()
      );
      onDateChange(newDates);
    } else {
      // Date is not selected, add it
      onDateChange([...selectedDates, date]);
    }
  };

  return (
    <div>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date }) =>
          selectedDates.some((d) => d.getTime() === date.getTime())
            ? 'bg-blue-500 text-white'
            : ''
        }
      />
    </div>
  );
};

export default MyCalendar;
