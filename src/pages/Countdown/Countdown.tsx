import React, { useEffect } from 'react';
import ym from 'react-yandex-metrika';
import useReactRouter from 'use-react-router';
import { useTimer } from 'react-compound-timer';
import queryString from 'query-string';

import { Wrap } from './Countdown.styled';

const padUnit = (unit: number) => (unit < 10 ? `0${unit}` : unit);

export const Countdown: React.FC = () => {
  const {
    location: { search },
  } = useReactRouter();
  const { ts, timer } = queryString.parse(search);

  const {
    value: { h, m, s, ms },
  } = useTimer({
    initialTime: ts ? parseInt(ts as string) - Date.now() : parseInt(timer),
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
      ym('params', { 'countdown-param': parseInt(ts as string) });
    }

    if (timer) {
      ym('params', { 'timer-param': parseInt(timer as string) });
    }
  }, []);

  return <Wrap>{valueString}</Wrap>;
};
