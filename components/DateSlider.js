import React, { useState, useEffect, useContext } from 'react';
import { AllPositionsContext } from '../services/AllPositionsContext';

const DateSlider = () => {
  const MIN_YEAR = 2018;
  const { month, setMonth, year, setYear } = useContext(AllPositionsContext);

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    let month = value % 12;
    let year = MIN_YEAR + Math.floor(value / 12);
    if(month === 0) {
        year -= 1;
        month = 12;
    }
    setMonth(month === 0 ? 12 : month);
    setYear(year);
  }

  return (
    <div className="all-challenge-slider">
      <p>Selected Month: {month}/{year}</p>
      <input className="slider" type="range" min={0} 
             max={(new Date().getFullYear() - MIN_YEAR) * 12 + new Date().getMonth() + 1} 
             value={(year - MIN_YEAR) * 12 + month}
             onChange={handleChange} />
    </div>
  );
};

export default DateSlider;