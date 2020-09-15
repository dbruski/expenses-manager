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
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: [
          ...state.expenses.filter(
            (expense) => expense.id !== payload.expense.id,
          ),
          payload.expense,
        ],
      };
    case DELETE_EXPENSE_SOFT:
      return {
        ...state,
        expenses: [
          ...state.expenses.filter(
            (expense) => expense.id !== payload.expense.id,
          ),
          { ...payload.expense, constantly: false, inMonthAndYear: [] },
        ],
      };
    case DELETE_EXPENSE_HARD:
      return {
        ...state,
        expenses: [
          ...state.expenses.filter((expense) => expense.id !== payload.id),
        ],
      };
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, payload.category] };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories.filter((category) => category.id !== payload.id),
          { id: payload.id, name: payload.name },
        ],
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories.filter((category) => category.id !== payload.id),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
