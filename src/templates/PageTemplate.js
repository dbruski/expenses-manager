import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from '../components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.main`
  position: relative;
  min-height: 100vh;
  width: 92vw;
  margin-left: 8vw;
  overflow: hidden;
`;

const PageTemplate = ({ children }) => (
  <StyledWrapper>
    <Sidebar />
    {children}
  </StyledWrapper>
);

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageTemplate;
