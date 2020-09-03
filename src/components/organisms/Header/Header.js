import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.header`
  width: 100%;
  height: 10vh;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
`;

const StyledHeader = styled.h1`
  color: green;
`;

const Header = ({ title, children }) => {
  return (
    <StyledWrapper>
      <StyledHeader>{title}</StyledHeader>
      {children}
    </StyledWrapper>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default Header;
