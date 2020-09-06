import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div``;

const StyledSwitcher = styled.label`
  position: relative;
  width: 50px;
  height: 26px;
  display: inline-block;
  background: ${({ theme }) => theme.white};
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: 50px;
  transition: 0.4s ease;
  cursor: pointer;

  ::after {
    position: absolute;
    left: 1px;
    top: 1px;
    background: ${({ theme }) => theme.grey200};
    border-radius: 50%;
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: 0.4s ease;
  }
`;

const StyledCheckbox = styled.input`
  display: none;

  :checked ~ ${StyledSwitcher} {
    background: ${({ theme }) => theme.grey};
    border-color: ${({ theme }) => theme.grey3};

    ::after {
      background: ${({ theme }) => theme.primary};
      transform: translateX(24px);
    }
  }
`;

const Toggler = ({ checked, changeFunction }) => {
  return (
    <StyledWrapper>
      <StyledCheckbox
        id="checkbox"
        name="constantly"
        type="checkbox"
        checked={checked}
        value="true"
        onChange={changeFunction}
      />
      <StyledSwitcher htmlFor="checkbox" />
    </StyledWrapper>
  );
};

Toggler.propTypes = {
  checked: PropTypes.bool.isRequired,
  changeFunction: PropTypes.func.isRequired,
};

export default Toggler;
