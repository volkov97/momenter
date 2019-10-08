import React, { memo, useCallback } from 'react';

import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { useTimerValue } from 'src/lib/providers/TimerValueProvider';
import { Control } from 'src/components/Control';

import { DateTimePicker } from 'src/components-basic/DateTimePicker';

import { Row, Col } from '../NumbersViewSettings/NumbersViewSettings.styled';

export const CountdownControls: React.FC = memo(() => {
  const { initialTime } = useBigNumberOptions();
  const { controls } = useTimerValue();

  const onDateChange = useCallback(
    date => controls.setTime(date.getTime() - new Date().getTime()),
    [],
  );

  return (
    <Row>
      <Col>
        <Control
          title="Countdown target"
          content={
            <DateTimePicker
              defaultDate={new Date(new Date().getTime() + initialTime)}
              minDate={new Date()}
              showTime={true}
              onChange={onDateChange}
            />
          }
        />
      </Col>
    </Row>
  );
});
