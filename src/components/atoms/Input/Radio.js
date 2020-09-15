import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  position: relative;
  padding-left: 25px;
`;

const StyledCircle = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  height: 20px;
  width: 20px;
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: 50px;
  cursor: pointer;

  ::after {
    content: '';
    height: 12px;
    width: 12px;
    background: ${({ theme }) => theme.primary};
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50px;
    transition: 150ms ease-out;
  }
`;

const StyledRadio = styled.input`
  display: none;

  &:checked {
    & ~ ${StyledCircle} {
      border-color: ${({ theme }) => theme.primary};
    }
    & ~ ${StyledCircle}::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const Radio = ({ id, name, value, label, checked, onChange }) => {
  return (
    <StyledLabel>
      <StyledRadio
        type="radio"
        value={value}
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
      <StyledCircle />
    </StyledLabel>
  );
};

export default Radio;
