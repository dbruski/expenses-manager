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

const ExpenseItem = ({ header, name, amount, deadline, type, status }) => {
  return (
    <StyledExpense header={header}>
      <StyledExpenseItem nameItem>{name}</StyledExpenseItem>
      <StyledExpenseItem>{amount}</StyledExpenseItem>
      <StyledExpenseItem>{deadline}</StyledExpenseItem>
      <StyledExpenseItem>{type ? 'auto' : 'manual'}</StyledExpenseItem>
      <StyledExpenseItem>{status ? 'paid' : 'not paid'}</StyledExpenseItem>
    </StyledExpense>
  );
};

ExpenseItem.propTypes = {
  header: PropTypes.bool,
  name: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

ExpenseItem.defaultProps = {
  header: false,
  name: 'name',
  amount: 'amount',
  deadline: 'deadline',
  type: 'type',
  status: 'status',
};

export default ExpenseItem;
