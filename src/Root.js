import React from 'react';
import { Provider } from './context';
import { routes } from './routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';
import Home from './views/Home';
import Chart from './views/Chart';
import Settings from './views/Settings';

const Root = () => (
  <Provider>
    <MainTemplate>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={routes.chart} component={Chart} />
          <Route exact path={routes.settings} component={Settings} />
        </Switch>
      </BrowserRouter>
    </MainTemplate>
  </Provider>
);

export default Root;
