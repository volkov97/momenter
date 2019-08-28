import React from 'react';
import useReactRouter from 'use-react-router';

import queryString from 'query-string';

import { Container } from 'src/components/Layout/Container';

import { HeaderLarge } from 'src/components/Layout/Header';
import { TextContent } from 'src/components/Layout/TextContent';
import { CounterOptions } from 'src/components/CounterOptions/CounterOptions';

import { Wrap } from './Home.styled';

export const Home: React.FC = () => {
  const { history } = useReactRouter();

  return (
    <Container>
      <Wrap>
        <HeaderLarge>Momenter</HeaderLarge>

        <TextContent>
          Are you waiting for any events?
          <br />
          Choose date and time to see a countdown to this event.
        </TextContent>

        <CounterOptions
          onSubmit={(ts: number) => history.push(`/countdown?${queryString.stringify({ ts })}`)}
        />
      </Wrap>
    </Container>
  );
};
