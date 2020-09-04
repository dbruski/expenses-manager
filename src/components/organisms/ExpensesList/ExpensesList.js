import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  const { month, year, expenses } = useContext(AppContext);

  return (
    <StyledWrapper>
      <StyledList>
        <ExpenseItem
          header
          name="name"
          amount="amount"
          deadline="deadline"
          type="type"
          status="status"
        />
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            name={expense.name}
            amount={expense.amount}
            deadline={expense.deadline}
            type={expense.auto}
            status={expense.status}
          />
        ))}
      </StyledList>
    </StyledWrapper>
  );
};

ExpensesList.propTypes = {};

export default ExpensesList;
