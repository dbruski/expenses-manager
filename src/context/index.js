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
      deadline: 15,
      constantly: true,
      paid: [],
    },
    {
      id: 2,
      name: 'samochod',
      amount: 1000,
      auto: false,
      deadline: 20,
      constantly: true,
      paid: [],
    },
    {
      id: 3,
      name: 'w pazdzierniku',
      amount: 100,
      auto: false,
      deadline: 25,
      constantly: false,
      inMonthAndYear: [{ month: 9, year: 2020 }],
      paid: [],
    },
    {
      id: 4,
      name: 'we wrzesniu',
      amount: 550,
      auto: false,
      deadline: 30,
      constantly: false,
      inMonthAndYear: [
        { month: 8, year: 2020 },
        { month: 40, year: 60060 },
      ],
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
        expenses: state.expenses,
        setMonth: setMonth(dispatch),
        setYear: setYear(dispatch),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
