import React, { createContext, useReducer } from 'react';
import reducer from '../reducer';
import { setMonth, setYear } from '../actions';

export const AppContext = createContext();

const date = new Date();

const initial = {
  year: date.getFullYear(),
  month: date.getMonth(),
  expenses: [
    {
      id: 1,
      name: 'mieszkanie',
      amount: 1500,
      auto: true,
      daytopay: 15,
      constantly: true,
      paid: [],
    },
    {
      id: 2,
      name: 'samochod',
      amount: 1000,
      auto: false,
      daytopay: 20,
      constantly: true,
      paid: [],
    },
  ],
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <AppContext.Provider
      value={{
        month: state.month,
        year: state.year,
        setMonth: setMonth(dispatch),
        setYear: setYear(dispatch),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
