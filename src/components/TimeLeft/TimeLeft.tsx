import React from 'react';
import { TimerValue } from 'react-compound-timer';
import Typography from '@material-ui/core/Typography';

import { Wrap, TimeUnit, TimeUnitName, TimeUnitValue, InvisibleDigit } from './TimeLeft.styled';

function getNumberDigitsCount(num: number) {
  return String(num).length;
}

interface TimeLeftProps {
  time: TimerValue;
}

export const TimeLeft: React.FC<TimeLeftProps> = ({ time }) => {
  const maxDigits = Math.max(...[time.d, time.h, time.m, time.s].map(val => String(val).length));

  return (
    <Wrap>
      {[
        { name: 'days', value: time.d },
        { name: 'hours', value: time.h },
        { name: 'minutes', value: time.m },
        { name: 'seconds', value: time.s },
      ].map(item => {
        return (
          <TimeUnit key={item.name}>
            <TimeUnitValue>
              <Typography variant="h4" component="span">
                {new Array(maxDigits - getNumberDigitsCount(item.value))
                  .fill(null)
                  .map((_, index) => (
                    <InvisibleDigit key={index}>0</InvisibleDigit>
                  ))}
              </Typography>
              <Typography variant="h4" component="span">
                {item.value}
              </Typography>
            </TimeUnitValue>
            <TimeUnitName>
              <Typography variant="h4" component="span">
                {item.name}
              </Typography>
            </TimeUnitName>
          </TimeUnit>
        );
      })}
    </Wrap>
  );
};
