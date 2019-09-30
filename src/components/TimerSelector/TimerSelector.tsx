import React, { useState, useMemo } from 'react';
import InputMask from 'react-input-mask';

import { Wrap, TimerOptions, TimerOption, TimeSetter, TimeStart } from './TimerSelector.styled';
import { Button } from 'src/components-basic/Button';
import { Input } from 'src/components-basic/Input';

const timerValues = [1, 5, 10, 15, 20, 30, 60];

export const TimerSelector: React.FC = () => {
  const [writtenTime, setWrittenTime] = useState<string>('hh:mm:ss');

  const writtenTs = useMemo(() => {
    const time = writtenTime.replace(/[a-z]/g, '0').split(':');

    return (parseInt(time[0]) * 60 * 60 + parseInt(time[1]) * 60 + parseInt(time[2])) * 1000;
  }, [writtenTime]);

  return (
    <Wrap>
      <TimerOptions>
        {timerValues.map(timerValue => {
          return (
            <TimerOption key={timerValue}>
              <Button linkTo={`/countdown?timer=${timerValue * 60 * 1000}`}>
                {timerValue} min
              </Button>
            </TimerOption>
          );
        })}
      </TimerOptions>
      <TimeSetter>
        <InputMask
          mask="99:99:99"
          maskPlaceholder="hh:mm:ss"
          alwaysShowMask={true}
          value={writtenTime}
          onChange={e => setWrittenTime(e.target.value)}
        >
          <Input />
        </InputMask>

        <TimeStart>
          <Button linkTo={`/countdown?timer=${writtenTs}`}>Start timer</Button>
        </TimeStart>
      </TimeSetter>
    </Wrap>
  );
};
