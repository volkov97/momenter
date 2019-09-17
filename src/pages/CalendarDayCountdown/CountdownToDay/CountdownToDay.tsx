import React from 'react';
import { useTimer } from 'react-compound-timer';

import { TimeLeft } from 'src/components/TimeLeft/TimeLeft';

interface CountdownToDayProps {
  date: Date;
}

export const CountdownToDay: React.FC<CountdownToDayProps> = ({ date }) => {
  const ts = date.getTime();

  const delta = ts - Date.now() > 0 ? ts - Date.now() : 0;

  const { value } = useTimer({
    initialTime: delta,
    lastUnit: 'd',
    direction: 'backward',
    timeToUpdate: 200,
  });

  return <TimeLeft time={value} />;
};
