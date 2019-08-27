import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { useTimer } from 'react-compound-timer';
import queryString from 'query-string';

import { Wrap } from './Countdown.styled';

const padUnit = (unit: number) => (unit < 10 ? `0${unit}` : unit);

export const Countdown: React.FC = () => {
  const {
    location: { search },
  } = useReactRouter();
  const { ts } = queryString.parse(search);

  const { value } = useTimer({
    initialTime: parseInt(ts as string) - Date.now(),
    lastUnit: 'h',
    direction: 'backward',
  });

  const valueString = `${padUnit(value.h)}:${padUnit(value.m)}:${padUnit(value.s)}`;

  useEffect(() => {
    document.title = valueString;
  }, [valueString]);

  return <Wrap>{valueString}</Wrap>;
};
