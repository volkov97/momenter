import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home } from './pages/Home';
import { Countdown } from './pages/Countdown';
import { GlobalStyles } from './App.styled';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyles />

      <Switch>
        <Route path="/" exact={true} render={() => <Home />} />
        <Route path="/countdown" render={() => <Countdown />} />

        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </React.Fragment>
  );
};
