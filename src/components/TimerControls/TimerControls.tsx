import React from 'react';
import { getTimeParts } from 'react-compound-timer';
import InputMask from 'react-input-mask';
import { Button, Input } from 'antd';

import { transformTimeToMs } from 'src/lib/helpers/transformTimeToMs';
import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { Control } from 'src/components/Control';

import {
  Row,
  Col,
  ControlButtons,
  ControlButton,
} from '../NumbersViewSettings/NumbersViewSettings.styled';
import { useTimerValue } from 'src/lib/providers/TimerValueProvider';

function formatInitialTime(time: number) {
  const parts = getTimeParts(time, 'h');
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${pad(parts.h)}:${pad(parts.m)}:${pad(parts.s)}`;
}

export const TimerControls: React.FC = () => {
  const { initialTime, changeInitialTime } = useBigNumberOptions();
  const { value, controls } = useTimerValue();

  return (
    <Row>
      <Col>
        <Control
          title="Initial time"
          content={
            <InputMask
              mask="99:99:99"
              maskPlaceholder="hh:mm:ss"
              alwaysShowMask={true}
              disabled={value.state === 'PLAYING'}
              value={formatInitialTime(initialTime)}
              onChange={e => changeInitialTime(transformTimeToMs(e.target.value))}
            >
              <Input />
            </InputMask>
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
                    <Button onClick={() => controls.pause()}>Pause</Button>
                  </ControlButton>
                  <ControlButton>
                    <Button
                      onClick={() => {
                        controls.reset();
                        controls.stop();
                      }}
                    >
                      Stop
                    </Button>
                  </ControlButton>
                </React.Fragment>
              ) : null}

              {value.state === 'INITED' || value.state === 'STOPPED' ? (
                <React.Fragment>
                  <ControlButton>
                    <Button type="primary" onClick={() => controls.start()}>
                      Start
                    </Button>
                  </ControlButton>
                </React.Fragment>
              ) : null}

              {value.state === 'PAUSED' ? (
                <React.Fragment>
                  <ControlButton>
                    <Button onClick={() => controls.resume()}>Resume</Button>
                  </ControlButton>
                </React.Fragment>
              ) : null}
            </ControlButtons>
          }
        />
      </Col>
    </Row>
  );
};
