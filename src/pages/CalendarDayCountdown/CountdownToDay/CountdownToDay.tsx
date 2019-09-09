import React from 'react';
import { useTimer } from 'react-compound-timer';

import { TimeLeft } from 'src/components/TimeLeft/TimeLeft';

interface CountdownToDayProps {
  date: Date;
}

export const CountdownToDay: React.FC<CountdownToDayProps> = ({ date }) => {
  const ts = date.getTime();

  const { value } = useTimer({
    initialTime: ts - Date.now(),
    lastUnit: 'd',
    direction: 'backward',
    timeToUpdate: 200,
  });

  return <TimeLeft time={value} />;
};
