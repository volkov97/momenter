import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home } from './pages/Home';
import { Countdown } from './pages/Countdown';
import { Calendar } from './pages/Calendar/Calendar';
import { CalendarDayCountdown } from './pages/CalendarDayCountdown/CalendarDayCountdown';

import { useHitNavigationToMetrika } from './lib/hooks/useHitNavigationToMetrika';
import { useNativeLogic } from './lib/hooks/useNativeLogic';

import { GlobalStyles } from './App.styled';

export const App: React.FC = () => {
  useNativeLogic();
  useHitNavigationToMetrika();

  return (
    <React.Fragment>
      <GlobalStyles />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/countdown" component={Countdown} />
        <Route path="/calendar" exact={true} component={Calendar} />
        <Route path="/calendar/:date" component={CalendarDayCountdown} />

        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </React.Fragment>
  );
};
