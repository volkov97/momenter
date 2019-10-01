import React, { useEffect } from 'react';
import { useTimer } from 'react-compound-timer';
import useReactRouter from 'use-react-router';
import ym from 'react-yandex-metrika';
import queryString from 'query-string';

import { padUnit } from 'src/lib/helpers/padUnit';

import { Wrap } from './Timer.styled';
import { NumbersViewSettings } from 'src/components/NumbersViewSettings';
import { BigNumber } from 'src/components/BigNumber';
import { Container } from 'src/components/Layout/Container';

export const Timer = () => {
  const {
    location: { search },
  } = useReactRouter();
  const queryParams = queryString.parse(search);
  const ts = parseInt(queryParams.ts);

  const {
    value: { h, m, s, ms },
  } = useTimer({
    initialTime: ts,
    lastUnit: 'h',
    direction: 'backward',
    timeToUpdate: 500,
  });

  const valueString = `${padUnit(h)}:${padUnit(m)}:${padUnit(ms >= 500 ? s + 1 : s)}`;

  useEffect(() => {
    document.title = valueString;
  }, [valueString]);

  useEffect(() => {
    if (ts) {
      ym('params', { 'timer-param': ts });
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <NumbersViewSettings />
      </Container>

      <Wrap>
        <BigNumber>{valueString}</BigNumber>
      </Wrap>
    </React.Fragment>
  );
};
