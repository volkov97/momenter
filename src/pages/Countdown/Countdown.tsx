import React, { useEffect } from 'react';
import ym from 'react-yandex-metrika';
import useReactRouter from 'use-react-router';
import { useTimer } from 'react-compound-timer';
import queryString from 'query-string';

import { padUnit } from 'src/lib/helpers/padUnit';

import { Wrap } from './Countdown.styled';
import { BigNumber } from 'src/components/BigNumber';

export const Countdown: React.FC = () => {
  const {
    location: { search },
  } = useReactRouter();
  const queryParams = queryString.parse(search);
  const ts = parseInt(queryParams.ts);

  const {
    value: { h, m, s, ms },
  } = useTimer({
    initialTime: ts - Date.now(),
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
      ym('params', { 'countdown-param': ts });
    }
  }, []);

  return (
    <Wrap>
      <BigNumber>{valueString}</BigNumber>
    </Wrap>
  );
};
