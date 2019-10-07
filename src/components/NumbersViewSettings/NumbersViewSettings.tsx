import React from 'react';
import useReactRouter from 'use-react-router';
import {
  InputNumber,
  Button,
  Radio,
  Dropdown,
  Tabs,
  Select,
  Checkbox,
  Slider,
  message,
  Input,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ChromePicker } from 'react-color';
import { Unit, getTimeParts } from 'react-compound-timer';
import InputMask from 'react-input-mask';
import CopyToClipboard from 'react-copy-to-clipboard';
import ym from 'react-yandex-metrika';
import ga from 'react-ga';

import { Control } from '../Control';
import { useBigNumberOptions, FontSize } from 'src/lib/providers/BigNumberOptionsProvider';

import { sortedFonts, fonts, getReadableFontName } from 'src/config/fonts';
import { useFullscreen } from 'src/lib/providers/FullscreenProvider';
import { transformTimeToMs } from 'src/lib/helpers/transformTimeToMs';

import {
  Wrap,
  Row,
  Col,
  BlockHeight,
  ControlButtons,
  ControlButton,
} from './NumbersViewSettings.styled';

function track(name: string, value: string | number) {
  ym('params', { options: { [name]: value } });

  ga.event({
    category: 'options',
    action: name,
    [typeof value === 'string' ? 'label' : 'value']: value,
  });
}

function formatInitialTime(time: number) {
  const parts = getTimeParts(time, 'h');
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${pad(parts.h)}:${pad(parts.m)}:${pad(parts.s)}`;
}

interface NumbersViewSettingsProps {
  showControls: boolean;
}

export const NumbersViewSettings: React.FC<NumbersViewSettingsProps> = ({ showControls }) => {
  const {
    fontColor,
    changeFontColor,
    backgroundColor,
    changeBackgroundColor,
    changeFontSize,
    changeMsVisibility,
    lastUnit,
    changeLastUnit,
    updateInterval,
    changeUpdateInterval,
    changeFontFamily,
    fontFamily,
    showMs,
    timer,
    initialTime,
    changeInitialTime,
  } = useBigNumberOptions();
  const { enterFullscreen, isFullscreenEnabled } = useFullscreen();
  const { location } = useReactRouter();

  const linkToCopy = `${window.location.origin}${location.pathname}${location.search}`;

  return (
    <Wrap>
      <Tabs
        defaultActiveKey="1"
        animated={false}
        tabBarExtraContent={
          <React.Fragment>
            {isFullscreenEnabled() && (
              <Button
                shape="circle"
                icon="fullscreen"
                onClick={() => {
                  track('fullscreen', 'enable');
                  enterFullscreen(document.getElementById('bigNumber') as HTMLElement);
                }}
              />
            )}

            <CopyToClipboard
              text={linkToCopy}
              onCopy={() => {
                track('copy', linkToCopy);
                message.success('Link to this countdown was copied successfully!');
              }}
            >
              <Button type="link" icon="copy">
                Save link
              </Button>
            </CopyToClipboard>
          </React.Fragment>
        }
      >
        {showControls ? (
          <Tabs.TabPane tab="Controls" key="controls">
            <Row>
              <Col>
                <Control
                  title="Initial time"
                  content={
                    <InputMask
                      mask="99:99:99"
                      maskPlaceholder="hh:mm:ss"
                      alwaysShowMask={true}
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
          </Tabs.TabPane>
        ) : null}
        <Tabs.TabPane tab="Units" key="units">
          <Row>
            <Col>
              <Control
                title="Last visible unit"
                content={
                  <Radio.Group
                    buttonStyle="solid"
                    value={lastUnit}
                    onChange={e => {
                      const unit = e.target.value as Unit;

                      track('lastUnit', unit);
                      changeLastUnit(unit);
                    }}
                  >
                    <Radio.Button value="h">Hours</Radio.Button>
                    <Radio.Button value="m">Minutes</Radio.Button>
                    <Radio.Button value="s">Seconds</Radio.Button>
                  </Radio.Group>
                }
              />
            </Col>
            <Col>
              <Control
                title="Milliseconds"
                content={
                  <BlockHeight>
                    <Checkbox
                      checked={showMs}
                      onChange={(e: CheckboxChangeEvent) => {
                        const value = e.target.checked;

                        track('showMs', String(value));
                        changeMsVisibility(value);
                      }}
                    >
                      Show milliseconds
                    </Checkbox>
                  </BlockHeight>
                }
              />
            </Col>
            <Col>
              <Control
                title="Update time (ms)"
                content={
                  <BlockHeight>
                    <Slider
                      style={{ width: 160 }}
                      min={24}
                      max={1000}
                      tooltipPlacement="bottom"
                      defaultValue={updateInterval}
                      onAfterChange={value => {
                        track('updateInterval', value as number);
                        changeUpdateInterval(value as number);
                      }}
                    />
                  </BlockHeight>
                }
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Font" key="font">
          <Row>
            <Col>
              <Control
                title="Family"
                content={
                  <Select
                    defaultValue="arial"
                    style={{ width: 120 }}
                    dropdownMatchSelectWidth={false}
                    value={getReadableFontName(fontFamily)}
                    onChange={(val: string) => {
                      track('fontFamily', String(val));
                      changeFontFamily(fonts[val]);
                    }}
                  >
                    {sortedFonts.map(font => (
                      <Select.Option key={font[0]} value={font[0]}>
                        {font[2]}
                      </Select.Option>
                    ))}
                  </Select>
                }
              />
            </Col>
            <Col>
              <Control
                title="Color"
                content={
                  <Dropdown
                    overlay={
                      <ChromePicker
                        color={fontColor}
                        onChangeComplete={color => {
                          track('fontColor', String(color.hex));
                          changeFontColor(color.hex);
                        }}
                      />
                    }
                  >
                    <Input value={fontColor} disabled={true} />
                  </Dropdown>
                }
              />
            </Col>
            <Col>
              <Control
                title="Size"
                content={
                  <InputNumber
                    min={1}
                    max={5}
                    defaultValue={3}
                    onChange={value => {
                      const val = ((value as number) || 1) - 1;

                      track('fontSize', val);
                      changeFontSize(val as FontSize);
                    }}
                  />
                }
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Background" key="background">
          <Row>
            <Col>
              <Control
                title="Color"
                content={
                  <Dropdown
                    overlay={
                      <ChromePicker
                        color={backgroundColor}
                        onChangeComplete={color => {
                          track('backgroundColor', color.hex);
                          changeBackgroundColor(color.hex);
                        }}
                      />
                    }
                  >
                    <Input value={backgroundColor} disabled={true} />
                  </Dropdown>
                }
              />
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </Wrap>
  );
};
