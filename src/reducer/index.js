import { SET_MONTH, SET_YEAR, SET_AS_PAID, ADD_EXPENSE } from '../consts';

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
    case SET_AS_PAID:
      return {
        ...state,
        expenses: [
          ...state.expenses.map((expense) => {
            if (expense.id === payload.id) {
              expense.paid.push({
                month: payload.month,
                year: payload.year,
                amount: payload.amount,
              });
              return expense;
            }
            return expense;
          }),
        ],
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, payload.expense],
      };
    default:
      return state;
  }
};

export default reducer;
