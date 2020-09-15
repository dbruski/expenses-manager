import {
  SET_MONTH,
  SET_YEAR,
  SET_AS_PAID,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE_SOFT,
  DELETE_EXPENSE_HARD,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from '../consts';

export const setMonth = (dispatch) => (month) => {
  dispatch({
    type: SET_MONTH,
    payload: { month },
  });
};

export const setYear = (dispatch) => (year) => {
  dispatch({
    type: SET_YEAR,
    payload: { year },
  });
};

export const setAsPaid = (dispatch) => (id, month, year, amount) => {
  dispatch({
    type: SET_AS_PAID,
    payload: { id, month, year, amount },
  });
};

export const addExpense = (dispatch) => (expense) => {
  dispatch({
    type: ADD_EXPENSE,
    payload: { expense },
  });
};

export const editExpense = (dispatch) => (expense) => {
  dispatch({
    type: EDIT_EXPENSE,
    payload: { expense },
  });
};

export const deleteExpenseSoft = (dispatch) => (expense) => {
  dispatch({
    type: DELETE_EXPENSE_SOFT,
    payload: { expense },
  });
};

export const deleteExpenseHard = (dispatch) => (id) => {
  dispatch({
    type: DELETE_EXPENSE_HARD,
    payload: { id },
  });
};

export const addCategory = (dispatch) => (category) => {
  dispatch({
    type: ADD_CATEGORY,
    payload: { category },
  });
};

export const editCategory = (dispatch) => ({ id, name }) => {
  dispatch({
    type: EDIT_CATEGORY,
    payload: { id, name },
  });
};

export const deleteCategory = (dispatch) => (id) => {
  dispatch({
    type: DELETE_CATEGORY,
    payload: { id },
  });
};
