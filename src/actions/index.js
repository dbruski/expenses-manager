import { SET_MONTH, SET_YEAR, SET_AUTO_PAID } from '../consts';

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

export const setAutoPaid = (dispatch) => (id, month, year, amount) => {
  dispatch({
    type: SET_AUTO_PAID,
    payload: { id, month, year, amount },
  });
};
