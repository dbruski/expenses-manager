import { SET_MONTH, SET_YEAR } from '../consts';

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
