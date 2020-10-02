import React, { createContext, useReducer, useEffect } from 'react';
import reducer from '../reducer';
import {
  setMonth,
  setYear,
  setAsPaid,
  addExpense,
  editExpense,
  deleteExpenseSoft,
  deleteExpenseHard,
  addCategory,
  editCategory,
  deleteCategory,
  changeTheme,
  setDaysToRemind,
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
        categories: [],
        expenses: [],
        isThemeDark:
          date.getHours() < 6 || date.getHours() >= 20 ? true : false,
        daysToRemind: 3,
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
        isThemeDark:
          date.getHours() < 6 || date.getHours() >= 20 ? true : false,
        daysToRemind: state.daysToRemind,
      }),
    );
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        day: state.day,
        month: state.month,
        year: state.year,
        currentMonth: state.currentMonth,
        currentYear: state.currentYear,
        categories: state.categories,
        expenses: state.expenses,
        isThemeDark: state.isThemeDark,
        daysToRemind: state.daysToRemind,
        setMonth: setMonth(dispatch),
        setYear: setYear(dispatch),
        setAsPaid: setAsPaid(dispatch),
        addExpense: addExpense(dispatch),
        editExpense: editExpense(dispatch),
        deleteExpenseSoft: deleteExpenseSoft(dispatch),
        deleteExpenseHard: deleteExpenseHard(dispatch),
        addCategory: addCategory(dispatch),
        editCategory: editCategory(dispatch),
        deleteCategory: deleteCategory(dispatch),
        changeTheme: changeTheme(dispatch),
        setDaysToRemind: setDaysToRemind(dispatch),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
