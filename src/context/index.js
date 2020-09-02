import React, { createContext, useReducer } from 'react';
import reducer from '../reducer';

export const AppContext = createContext();

const initial = {};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
