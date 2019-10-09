import React, { memo, useCallback, useState } from 'react';
import { Button } from 'antd';
import { addMinutes, startOfMinute } from 'date-fns';

import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { useCountdownValue } from 'src/lib/providers/CountdownValueProvider';
import { Control } from 'src/components/Control';

import { DateTimePicker } from 'src/components-basic/DateTimePicker';

import {
  Row,
  Col,
  ControlButtons,
  ControlButton,
} from '../NumbersViewSettings/NumbersViewSettings.styled';

export const CountdownControls: React.FC = memo(() => {
  const { ts, changeTs } = useBigNumberOptions();
  const { value, controls } = useCountdownValue();

  const [targetDate, setTargetDate] = useState<Date>();

  const minDate = startOfMinute(addMinutes(new Date(), 1));
  const defaultDate = startOfMinute(new Date(ts));

  const onDateChange = useCallback(
    (date: Date) => setTargetDate(date.getTime() > minDate.getTime() ? date : minDate),
    [minDate],
  );

  return (
    <Row>
      <Col>
        <Control
          title="Countdown target"
          content={
            <DateTimePicker
              defaultDate={defaultDate > minDate ? defaultDate : minDate}
              disabled={value.state === 'PLAYING'}
              minDate={minDate}
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
                          if (targetDate.getTime() === ts) {
                            controls.setTime(ts - Date.now());
                            controls.start();

                            return;
                          }

                          changeTs(targetDate.getTime());
                        }
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
