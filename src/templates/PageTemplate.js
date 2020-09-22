import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from '../components/organisms/Sidebar/Sidebar';
import { device } from '../helpers';

const StyledWrapper = styled.main`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  margin: 0 0 10vh 0;
  overflow: hidden;

  @media ${device.desktop} {
    width: 92vw;
    margin: 0 0 0 8vw;
  }
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
