import React from 'react';
import { TimerValue } from 'react-compound-timer';

import { Wrap, TimeUnit, TimeUnitName, TimeUnitValue } from './TimeLeft.styled';

interface TimeLeftProps {
  time: TimerValue;
}

export const TimeLeft: React.FC<TimeLeftProps> = ({ time }) => (
  <Wrap>
    {[
      { name: 'days', value: time.d },
      { name: 'hours', value: time.h },
      { name: 'minutes', value: time.m },
      { name: 'seconds', value: time.s },
    ].map(item => {
      return (
        <TimeUnit key={item.name}>
          <TimeUnitValue>{item.value}</TimeUnitValue>
          <TimeUnitName>{item.name}</TimeUnitName>
        </TimeUnit>
      );
    })}
  </Wrap>
);
