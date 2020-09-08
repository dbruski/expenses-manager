import React, { useContext } from 'react';
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

const ExpensesList = () => {
  const {
    day,
    month,
    year,
    currentMonth,
    currentYear,
    expenses,
    setAsPaid,
  } = useContext(AppContext);

  const constantlyExpenses = expenses.filter((expense) => expense.constantly);

  const specifiedExpenses = expenses
    .filter((expense) => expense.inMonthAndYear)
    .filter((specifiedExpense) =>
      specifiedExpense.inMonthAndYear.some(
        (dateObject) => dateObject.month === month && dateObject.year === year,
      ),
    );

  const expensesInThisMonth = [...constantlyExpenses, ...specifiedExpenses];

  return (
    <StyledWrapper>
      <StyledList>
        <ExpenseItem header />
        {expensesInThisMonth.map((expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            name={expense.name}
            amount={expense.amount}
            deadline={expense.deadline}
            auto={expense.auto}
            paid={expense.paid}
            setAsPaidFc={setAsPaid}
            day={day}
            month={month}
            currentMonth={currentMonth}
            year={year}
            currentYear={currentYear}
          />
        ))}
      </StyledList>
    </StyledWrapper>
  );
};

export default ExpensesList;
