import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../../../context';
import { months } from '../../../helpers';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const StyledWrapper = styled.header`
  width: 100%;
  height: 10vh;
  background: ${({ theme }) => theme.white};
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
`;

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.primary};
`;

const StyledDateContainer = styled.div`
  width: 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.black};

  svg {
    font-size: ${({ theme }) => theme.fontSize.xl};
    cursor: pointer;
  }
`;

const Header = ({ title, withNav }) => {
  const { month, year, setMonth, setYear } = useContext(AppContext);
  const handleNextMonth = () => {
    if (month + 1 < 12) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  const handlePrevMonth = () => {
    if (month - 1 >= 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };
  return (
    <StyledWrapper>
      <StyledHeader>{title}</StyledHeader>
      {withNav && (
        <StyledDateContainer>
          <NavigateBeforeIcon onClick={handlePrevMonth} />
          {month !== undefined ? `${months[month].name} ${year}` : null}
          <NavigateNextIcon onClick={handleNextMonth} />
        </StyledDateContainer>
      )}
    </StyledWrapper>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default Header;
