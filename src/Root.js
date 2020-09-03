import React from 'react';
import { Provider } from './context';
import { routes } from './routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';
import Home from './views/Home';

const Root = () => (
  <Provider>
    <MainTemplate>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.home} component={Home} />
        </Switch>
      </BrowserRouter>
    </MainTemplate>
  </Provider>
);

export default Root;
