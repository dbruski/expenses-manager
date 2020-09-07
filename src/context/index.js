import React, { createContext, useReducer } from 'react';
import reducer from '../reducer';
import { setMonth, setYear, setAsPaid, addExpense } from '../actions';

export const AppContext = createContext();

const date = new Date();

const initial = {
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
  categories: [
    { id: 1, name: 'Car' },
    { id: 2, name: 'House' },
    { id: 3, name: 'Food' },
  ],
  expenses: [
    {
      id: 0,
      name: 'afterdeadline',
      amount: 10,
      auto: true,
      deadline: 1,
      constantly: true,
      paid: [],
    },
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
        day: state.day,
        month: state.month,
        year: state.year,
        categories: state.categories,
        expenses: state.expenses,
        setMonth: setMonth(dispatch),
        setYear: setYear(dispatch),
        setAsPaid: setAsPaid(dispatch),
        addExpense: addExpense(dispatch),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
