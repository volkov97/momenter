import React, { useState, useMemo } from 'react';
import InputMask from 'react-input-mask';
import { Input } from 'antd';

import { Button } from 'src/components-basic/Button';
import { transformTimeToMs } from 'src/lib/helpers/transformTimeToMs';

import {
  Wrap,
  TimerOptions,
  TimerOption,
  TimeSetter,
  TimeInput,
  TimeStart,
} from './TimerSelector.styled';

const timerValues = [1, 5, 10, 15, 20, 30, 60];

export const TimerSelector: React.FC = () => {
  const [writtenTime, setWrittenTime] = useState<string>('hh:mm:ss');

  const writtenTs = useMemo(() => transformTimeToMs(writtenTime), [writtenTime]);

  return (
    <Wrap>
      <TimerOptions>
        {timerValues.map(timerValue => {
          return (
            <TimerOption key={timerValue}>
              <Button linkTo={`/timer?ts=${timerValue * 60 * 1000}`}>{timerValue} min</Button>
            </TimerOption>
          );
        })}
      </TimerOptions>
      <TimeSetter>
        <TimeInput>
          <InputMask
            mask="99:99:99"
            maskPlaceholder="hh:mm:ss"
            alwaysShowMask={true}
            value={writtenTime}
            onChange={e => setWrittenTime(e.target.value)}
          >
            <Input />
          </InputMask>
        </TimeInput>

        <TimeStart>
          <Button linkTo={`/timer?ts=${writtenTs}`}>Start timer</Button>
        </TimeStart>
      </TimeSetter>
    </Wrap>
  );
};
