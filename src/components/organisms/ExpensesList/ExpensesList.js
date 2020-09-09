import React, { useState, useContext, useEffect } from 'react';
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
  const [expensesInThisMonth, setExpensesInThisMonth] = useState([]);

  useEffect(() => {
    const lastDayInThisMonth = new Date(year, month + 1, 0);

    const constantlyExpenses = expenses.filter((expense) => expense.constantly);

    const specifiedExpenses = expenses
      .filter((expense) => expense.inMonthAndYear)
      .filter((specifiedExpense) =>
        specifiedExpense.inMonthAndYear.some(
          (dateObject) =>
            dateObject.month === month && dateObject.year === year,
        ),
      );

    setExpensesInThisMonth(
      [...constantlyExpenses, ...specifiedExpenses].filter((expense) =>
        checkAddedDate(lastDayInThisMonth, expense.added),
      ),
    );
  }, [month, year, expenses]);

  const checkAddedDate = (last, expense) => {
    if (last - new Date(expense) >= 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <StyledWrapper onClick={() => console.log(expensesInThisMonth)}>
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
