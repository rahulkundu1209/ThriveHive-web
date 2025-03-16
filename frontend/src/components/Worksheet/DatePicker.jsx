import React, { useState, useRef } from "react";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const dateInputRef = useRef(null); // Reference to the input

  // Convert date to "DD/MMM/YYYY" format
  const formatDate = (dateStr) => {
    if (!dateStr) return { day: "DD", month: "MM", year: "YYYY" };
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleString("en-US", { month: "short" }), // Jan, Feb, etc.
      year: date.getFullYear(),
    };
  };

  const formatted = formatDate(selectedDate);

  return (
    <div className="flex flex-col items-center space-y-1">
      {/* Hidden Date Input (Now properly clickable) */}
      <input
        type="date"
        ref={dateInputRef}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="opacity-0 cursor-pointer hidden"
      />

      {/* Clickable Date Display */}
      <div
        className="flex flex-col items-center p-2 border rounded-md cursor-pointer"
        onClick={() => dateInputRef.current?.showPicker()} // Ensure picker opens
      >
        <span className="text-xl font-bold">{formatted.day}</span>
        <span className="text-md">{formatted.month}</span>
        <span className="text-sm">{formatted.year}</span>
      </div>
    </div>
  );
};

export default DatePicker;
