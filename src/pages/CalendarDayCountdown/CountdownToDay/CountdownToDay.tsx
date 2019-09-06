import React, { useEffect } from 'react';
import { useTimer } from 'react-compound-timer';

import { TimeLeft } from 'src/components/TimeLeft/TimeLeft';

const padUnit = (unit: number) => (unit < 10 ? `0${unit}` : unit);

interface CountdownToDayProps {
  date: Date;
}

export const CountdownToDay: React.FC<CountdownToDayProps> = ({ date }) => {
  const ts = date.getTime();

  const {
    value: { d, h, m, s, ms },
    value,
  } = useTimer({
    initialTime: ts - Date.now(),
    lastUnit: 'd',
    direction: 'backward',
    timeToUpdate: 200,
  });

  const valueString = `${padUnit(d)} d ${padUnit(h)}:${padUnit(m)}:${padUnit(
    ms >= 500 ? s + 1 : s,
  )}`;

  useEffect(() => {
    document.title = valueString;
  }, [valueString]);

  return <TimeLeft time={value} />;
};
