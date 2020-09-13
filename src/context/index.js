import React, { createContext, useReducer, useEffect } from 'react';
import reducer from '../reducer';
import {
  setMonth,
  setYear,
  setAsPaid,
  addExpense,
  addCategory,
  editCategory,
  deleteCategory,
} from '../actions';

export const AppContext = createContext();

const date = new Date();

const initial =
  localStorage.getItem('expenses-manager-state') === null
    ? {
        day: date.getDate(),
        currentMonth: date.getMonth(),
        currentYear: date.getFullYear(),
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
            category: 'Car',
            paid: [],
            added: '2020-09-08T22:00:00.000Z',
          },
          {
            id: 1,
            name: 'mieszkanie',
            amount: 1500,
            auto: true,
            deadline: 15,
            constantly: true,
            category: 'House',
            paid: [],
            added: '2020-09-08T22:00:00.000Z',
          },
          {
            id: 2,
            name: 'samochod',
            amount: 1000,
            auto: false,
            deadline: 20,
            constantly: true,
            category: 'Car',
            paid: [
              { month: 8, year: 2020, amount: 1000 },
              { month: 8, year: 1234, amount: 1000 },
            ],
            added: '2020-09-08T22:00:00.000Z',
          },
          {
            id: 3,
            name: 'w pazdzierniku',
            amount: 100,
            auto: false,
            deadline: 25,
            constantly: false,
            inMonthAndYear: [{ month: 9, year: 2020 }],
            category: 'Food',
            paid: [],
            addded: '2020-09-08T22:00:00.000Z',
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
            category: 'Food',
            paid: [],
            added: '2020-09-08T22:00:00.000Z',
          },
        ],
      }
    : JSON.parse(localStorage.getItem('expenses-manager-state'));

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem(
      'expenses-manager-state',
      JSON.stringify({
        day: date.getDate(),
        currentMonth: date.getMonth(),
        currentYear: date.getFullYear(),
        month: date.getMonth(),
        year: date.getFullYear(),
        expenses: state.expenses,
        categories: state.categories,
      }),
    );
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        day: state.day,
        currentMonth: state.currentMonth,
        currentYear: state.currentYear,
        month: state.month,
        year: state.year,
        categories: state.categories,
        expenses: state.expenses,
        setMonth: setMonth(dispatch),
        setYear: setYear(dispatch),
        setAsPaid: setAsPaid(dispatch),
        addExpense: addExpense(dispatch),
        addCategory: addCategory(dispatch),
        editCategory: editCategory(dispatch),
        deleteCategory: deleteCategory(dispatch),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
