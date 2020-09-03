import { SET_MONTH, SET_YEAR } from '../consts';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_MONTH:
      return {
        ...state,
        month: payload.month,
      };
    case SET_YEAR:
      return {
        ...state,
        year: payload.year,
      };
    default:
      return state;
  }
};

export default reducer;
