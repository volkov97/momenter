import React, { memo, useCallback, useState } from 'react';
import { Button } from 'antd';

import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { useTimerValue } from 'src/lib/providers/TimerValueProvider';
import { Control } from 'src/components/Control';

import { DateTimePicker } from 'src/components-basic/DateTimePicker';

import {
  Row,
  Col,
  ControlButtons,
  ControlButton,
} from '../NumbersViewSettings/NumbersViewSettings.styled';

export const CountdownControls: React.FC = memo(() => {
  const { initialTime, changeInitialTime } = useBigNumberOptions();
  const { value, controls } = useTimerValue();

  const [targetDate, setTargetDate] = useState<Date>();

  const onDateChange = useCallback(date => setTargetDate(date), []);

  return (
    <Row>
      <Col>
        <Control
          title="Countdown target"
          content={
            <DateTimePicker
              defaultDate={new Date(new Date().getTime() + initialTime)}
              disabled={value.state === 'PLAYING'}
              minDate={new Date()}
              showTime={true}
              onChange={onDateChange}
            />
          }
        />
      </Col>
      <Col>
        <Control
          title="Control buttons"
          content={
            <ControlButtons>
              {value.state === 'PLAYING' ? (
                <React.Fragment>
                  <ControlButton>
                    <Button
                      onClick={() => {
                        controls.setTime(0);
                        controls.stop();
                      }}
                    >
                      Reset
                    </Button>
                  </ControlButton>
                </React.Fragment>
              ) : null}

              {value.state === 'INITED' || value.state === 'STOPPED' ? (
                <React.Fragment>
                  <ControlButton>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (targetDate) {
                          changeInitialTime(targetDate.getTime() - new Date().getTime());
                          controls.setTime(targetDate.getTime() - new Date().getTime());
                        }

                        controls.start();
                      }}
                    >
                      Start
                    </Button>
                  </ControlButton>
                </React.Fragment>
              ) : null}
            </ControlButtons>
          }
        />
      </Col>
    </Row>
  );
});
