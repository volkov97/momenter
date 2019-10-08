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

function formatInitialTime(time: number) {
  const parts = getTimeParts(time, 'h');
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${pad(parts.h)}:${pad(parts.m)}:${pad(parts.s)}`;
}

export const TimerControls: React.FC = () => {
  const { timer, initialTime, changeInitialTime } = useBigNumberOptions();

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
              disabled={timer.value.state === 'PLAYING'}
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
              {timer.value.state === 'PLAYING' ? (
                <React.Fragment>
                  <ControlButton>
                    <Button onClick={() => timer.controls.pause()}>Pause</Button>
                  </ControlButton>
                  <ControlButton>
                    <Button
                      onClick={() => {
                        timer.controls.reset();
                        timer.controls.stop();
                      }}
                    >
                      Stop
                    </Button>
                  </ControlButton>
                </React.Fragment>
              ) : null}

              {timer.value.state === 'INITED' || timer.value.state === 'STOPPED' ? (
                <React.Fragment>
                  <ControlButton>
                    <Button type="primary" onClick={() => timer.controls.start()}>
                      Start
                    </Button>
                  </ControlButton>
                </React.Fragment>
              ) : null}

              {timer.value.state === 'PAUSED' ? (
                <React.Fragment>
                  <ControlButton>
                    <Button onClick={() => timer.controls.resume()}>Resume</Button>
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
