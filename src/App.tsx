import React from 'react';
import { format } from 'date-fns';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home } from './pages/Home';
import { Countdown } from './pages/Countdown';
import { CalendarDayCountdown } from './pages/CalendarDayCountdown/CalendarDayCountdown';
import { Timer } from './pages/Timer';
import { Stopwatch } from './pages/Stopwatch';

import { Header } from './components/Header/Header';

import { useHitNavigationToMetrika } from './lib/hooks/useHitNavigationToMetrika';
import { useNativeLogic } from './lib/hooks/useNativeLogic';

import { GlobalStyles, PageContainer, PageContentContainer } from './App.styled';

export const App: React.FC = () => {
  useNativeLogic();
  useHitNavigationToMetrika();

  return (
    <React.Fragment>
      <GlobalStyles />

      <PageContainer>
        <Header />

        <PageContentContainer>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/countdown" component={Countdown} />
            <Route path="/stopwatch" component={Stopwatch} />
            <Route path="/timer" component={Timer} />
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
        </PageContentContainer>
      </PageContainer>
    </React.Fragment>
  );
};
