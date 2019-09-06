import React, { useRef, useEffect } from 'react';
import ym from 'react-yandex-metrika';
import useReactRouter from 'use-react-router';
import queryString from 'query-string';

import Typography from '@material-ui/core/Typography';

import { Container } from 'src/components/Layout/Container';
import { AppCard } from 'src/components/AppCard/AppCard';
import { CounterOptions } from 'src/components/CounterOptions/CounterOptions';

import { Wrap, Apps, App, Header, Content } from './Home.styled';

export const Home: React.FC = () => {
  const { history } = useReactRouter();

  const mountedTsRef = useRef<number>(0);

  useEffect(() => {
    mountedTsRef.current = performance.now();
  }, []);

  return (
    <Container>
      <Wrap>
        <Header>
          <Typography variant="h4" component="h1" gutterBottom>
            Momenter
          </Typography>
        </Header>

        <Content>
          <Typography variant="h5" component="h2" gutterBottom>
            Are you waiting for any events?
            <br />
            Choose date and time to see a countdown to this event.
          </Typography>
        </Content>

        <CounterOptions
          onSubmit={(ts: number) => {
            ym('reachGoal', 'btn-countdown-start-press', {
              'btn-countdown-start-press-ts': performance.now() - mountedTsRef.current,
            });

            history.push(`/countdown?${queryString.stringify({ ts })}`);
          }}
        />
      </Wrap>

      <Apps>
        <App>
          <AppCard
            title="Countdown Calendar"
            description="Waiting for any particular date? Choose a date from calendar and watch online countdown to it!"
            src="/images/calendar.jpg"
          />
        </App>
      </Apps>
    </Container>
  );
};
