import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '../../atoms/Button/Button';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const StyledExpense = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.25fr 0.25fr 0.25fr 0.25fr 0.25fr;
  background: ${({ theme }) => theme.white};
  margin-bottom: 1px;
  padding: 15px;
  transition: 0.2s ease-in-out;

  :hover {
    background: ${({ theme }) => theme.grey100};
  }

  ${({ header }) =>
    header &&
    css`
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};

      :hover {
        background: ${({ theme }) => theme.primary};
      }
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

const StyledStatusContainer = styled.span`
  color: ${({ theme }) => theme.white};
  background: ${({ paid, theme }) => (paid ? theme.primary : theme.danger)};
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

const ExpenseItem = ({
  header,
  id,
  name,
  amount,
  deadline,
  auto,
  paid,
  setAsPaidFc,
  day,
  month,
  currentMonth,
  year,
  currentYear,
}) => {
  const checkIfPaid = () =>
    paid && paid.some((obj) => obj.month === month && obj.year === year);

  useEffect(() => {
    if (
      !checkIfPaid() &&
      day >= deadline &&
      auto &&
      currentMonth === month &&
      currentYear === year
    ) {
      setAsPaidFc(id, month, year, amount);
    }
    //eslint-disable-next-line
  }, [day, month, deadline, auto]);

  const handleDeadlineContent = (header) => {
    if (header) {
      return 'deadline';
    } else {
      return `${deadline < 10 ? `0${deadline}` : deadline}-${
        month + 1 < 10 ? `0${month + 1}` : month + 1
      }-${year}`;
    }
  };

  const handleActionContent = (header) => {
    if (header) {
      return 'actions';
    } else if (checkIfPaid()) {
      return <Button disabled>paid</Button>;
    } else if (auto) {
      return <Button auto>auto</Button>;
    } else {
      return (
        <Button primary onClick={() => setAsPaidFc(id, month, year, amount)}>
          pay
        </Button>
      );
    }
  };

  const handleExpenseType = (header) => {
    if (header) {
      return 'type';
    } else if (auto) {
      return 'auto';
    } else {
      return 'manual';
    }
  };

  const handleStatus = (header) => {
    if (header) {
      return 'status';
    } else if (checkIfPaid()) {
      return (
        <StyledStatusContainer paid>
          <DoneIcon />
        </StyledStatusContainer>
      );
    } else {
      return (
        <StyledStatusContainer>
          <ClearIcon />
        </StyledStatusContainer>
      );
    }
  };
  return (
    <StyledExpense header={header}>
      <StyledExpenseItem nameItem>{name}</StyledExpenseItem>
      <StyledExpenseItem>{amount}</StyledExpenseItem>
      <StyledExpenseItem>{handleDeadlineContent(header)}</StyledExpenseItem>
      <StyledExpenseItem>{handleActionContent(header)}</StyledExpenseItem>
      <StyledExpenseItem>{handleExpenseType(header)}</StyledExpenseItem>
      <StyledExpenseItem>{handleStatus(header)}</StyledExpenseItem>
    </StyledExpense>
  );
};

ExpenseItem.propTypes = {
  header: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  auto: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  paid: PropTypes.array,
  setPaidFc: PropTypes.func,
  day: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
};

ExpenseItem.defaultProps = {
  name: 'name',
  amount: 'amount',
};

export default ExpenseItem;
