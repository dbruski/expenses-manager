import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledExpense = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.25fr 0.25fr 0.25fr 0.25fr 0.25fr;
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

const ExpenseItem = ({
  header,
  id,
  name,
  amount,
  deadline,
  type,
  paid,
  setAsPaidFc,
  month,
  year,
}) => {
  const checkIfPaid = () =>
    paid && paid.some((obj) => obj.month === month && obj.year === year);

  const handleExpenseType = (type) => (type ? 'auto' : 'manual');
  return (
    <StyledExpense header={header}>
      <StyledExpenseItem nameItem>{name}</StyledExpenseItem>
      <StyledExpenseItem>{amount}</StyledExpenseItem>
      <StyledExpenseItem>
        {header
          ? 'deadline'
          : `${deadline < 10 ? `0${deadline}` : deadline}-${
              month < 10 ? `0${month}` : month
            }-${year}`}
      </StyledExpenseItem>
      <StyledExpenseItem>
        {header ? (
          'actions'
        ) : checkIfPaid() ? (
          'paid'
        ) : (
          <span onClick={() => setAsPaidFc(id, month, year, amount)}>pay</span>
        )}
      </StyledExpenseItem>
      <StyledExpenseItem>{handleExpenseType(type)}</StyledExpenseItem>
      <StyledExpenseItem>
        {checkIfPaid() ? 'paid' : 'not paid'}
      </StyledExpenseItem>
    </StyledExpense>
  );
};

ExpenseItem.propTypes = {
  header: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setPaidFc: PropTypes.func,
  month: PropTypes.number,
  year: PropTypes.number,
};

ExpenseItem.defaultProps = {
  header: false,
  name: 'name',
  amount: 'amount',
  deadline: 'deadline',
  actions: 'actions',
  type: 'type',
  status: 'status',
};

export default ExpenseItem;
