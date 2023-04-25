import React, { useState } from 'react';
import { useEffect } from 'react';

const DateSlider = () => {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2018);

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    let month = value % 12;
    let year = 2018 + Math.floor(value / 12);
    if(month === 0){
        year -= 1;
        month = 12;
    }
    setMonth(month === 0 ? 12 : month);
    setYear(year);
  }

  return (
    <div>
      <p>Selected Month: {month}/{year}</p>
      <input type="range" min={0} max={(new Date().getFullYear() - 2018) * 12 + new Date().getMonth()} value={(year - 2018) * 12 + month} onChange={handleChange} />
    </div>
  );
};

export default DateSlider;