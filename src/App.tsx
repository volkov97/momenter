import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home } from './pages/Home';
import { Countdown } from './pages/Countdown';
import { CalendarDayCountdown } from './pages/CalendarDayCountdown/CalendarDayCountdown';

import { Header } from './components/Header/Header';

import { useHitNavigationToMetrika } from './lib/hooks/useHitNavigationToMetrika';
import { useNativeLogic } from './lib/hooks/useNativeLogic';

import { GlobalStyles } from './App.styled';
import { format } from 'date-fns';

export const App: React.FC = () => {
  useNativeLogic();
  useHitNavigationToMetrika();

  return (
    <React.Fragment>
      <GlobalStyles />

      <Header />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/countdown" component={Countdown} />
        <Route
          exact={true}
          path="/calendar"
          render={() => (
            <Redirect to={`/calendar/${format(new Date(), 'MMMM-do-yyyy').toLowerCase()}`} />
          )}
        />
        <Route path="/calendar/:date" component={CalendarDayCountdown} />

        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </React.Fragment>
  );
};
