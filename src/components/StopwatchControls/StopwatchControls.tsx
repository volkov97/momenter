import React from 'react';
import { Button } from 'antd';

import { Control } from 'src/components/Control';

import {
  Row,
  Col,
  ControlButtons,
  ControlButton,
} from '../NumbersViewSettings/NumbersViewSettings.styled';
import { useStopwatchValue } from 'src/lib/providers/StopwatchValueProvider';

export const StopwatchControls: React.FC = () => {
  const { value, controls } = useStopwatchValue();

  return (
    <Row>
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
                      Reset
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
                  <ControlButton>
                    <Button
                      onClick={() => {
                        controls.reset();
                        controls.stop();
                      }}
                    >
                      Reset
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
};
