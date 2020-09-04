import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledExpense = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.25fr 0.25fr 0.25fr 0.25fr;
  background: #fff;
  margin-bottom: 1px;
  padding: 15px;
  ${({ header }) =>
    header &&
    css`
      background: green;
      color: white;
    `}
`;

const StyledExpenseItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ nameItem }) =>
    nameItem &&
    css`
      justify-content: flex-start;
    `}
`;

const ExpenseItem = ({ header, name, deadline, amount, type, status }) => {
  return (
    <StyledExpense header={header}>
      <StyledExpenseItem nameItem>{name}</StyledExpenseItem>
      <StyledExpenseItem>{amount}</StyledExpenseItem>
      <StyledExpenseItem>{deadline}</StyledExpenseItem>
      <StyledExpenseItem>{type}</StyledExpenseItem>
      <StyledExpenseItem>{status}</StyledExpenseItem>
    </StyledExpense>
  );
};

ExpenseItem.propTypes = {};

export default ExpenseItem;
