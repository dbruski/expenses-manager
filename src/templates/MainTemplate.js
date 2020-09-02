import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from '../theme/GlobalStyle';

const MainTemplate = ({ children }) => (
  <>
    <GlobalStyle />
    {children}
  </>
);
MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
