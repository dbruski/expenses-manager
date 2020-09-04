import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../context';
import ExpenseItem from './ExpenseItem';

const StyledWrapper = styled.section`
  margin: 10vh 5vw;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ExpensesList = ({}) => {
  const { day, month, year, expenses, setAutoPaid } = useContext(AppContext);

  const constantlyExpenses = expenses.filter((expense) => expense.constantly);

  const specifiedExpenses = expenses
    .filter((expense) => expense.inMonthAndYear)
    .filter((specifiedExpense) =>
      specifiedExpense.inMonthAndYear.some(
        (dateObject) => dateObject.month === month && dateObject.year === year,
      ),
    );

  const expensesInThisMonth = [...constantlyExpenses, ...specifiedExpenses];

  useEffect(() => {
    expensesInThisMonth
      .filter((expense) => day >= expense.deadline)
      .forEach((expense) =>
        setAutoPaid(expense.id, month, year, expense.amount),
      );
  }, []);

  return (
    <StyledWrapper>
      <StyledList>
        <ExpenseItem header />
        {expensesInThisMonth.map((expense) => (
          <ExpenseItem
            key={expense.id}
            name={expense.name}
            amount={expense.amount}
            deadline={expense.deadline}
            type={expense.auto}
            status={expense.paid.some(
              (obj) => obj.month === month && obj.year === year,
            )}
          />
        ))}
      </StyledList>
    </StyledWrapper>
  );
};

export default ExpensesList;
