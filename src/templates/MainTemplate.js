import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/GlobalStyle';
import { AppContext } from '../context/';
import { theme, darkTheme } from '../theme/theme';

const MainTemplate = ({ children }) => {
  const { isThemeDark } = useContext(AppContext);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={isThemeDark ? darkTheme : theme}>
        {children}
      </ThemeProvider>
    </>
  );
};
MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
