import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledMonth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background: ${({ theme }) => theme.grey100};
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  :hover {
    background: ${({ theme }) => theme.grey150};
  }

  ${({ clicked }) =>
    clicked &&
    css`
      background: ${({ theme }) => theme.primary};

      :hover {
        background: ${({ theme }) => theme.primary100};
      }
    `}
`;

const MonthBox = ({
  children,
  addMonthFc,
  removeMonthFc,
  year,
  month,
  when,
}) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(
      Boolean(when.find((obj) => obj.month === month && obj.year === year)),
    );
    // eslint-disable-next-line
  }, [when, year]);

  const handleClick = () => {
    setClicked(!clicked);
    clicked ? removeMonthFc() : addMonthFc();
  };

  return (
    <StyledMonth clicked={clicked} onClick={handleClick}>
      {children}
    </StyledMonth>
  );
};

MonthBox.propTypes = {
  children: PropTypes.string,
  addMonthFc: PropTypes.func,
  removeMonthFc: PropTypes.func,
  year: PropTypes.number,
  month: PropTypes.number,
  when: PropTypes.array,
};

export default MonthBox;
