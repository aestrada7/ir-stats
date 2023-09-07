import React from 'react';

export const AllPositionsContext = React.createContext({
    month: 0,
    setMonth: () => {},
    year: 0,
    setYear: () => {}
});