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
import { Unit } from 'react-compound-timer';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Control } from '../Control';
import { useBigNumberOptions, FontSize } from 'src/lib/providers/BigNumberOptionsProvider';

import { Wrap, Row, Col, BlockHeight } from './NumbersViewSettings.styled';
import { sortedFonts, fonts, getReadableFontName } from 'src/config/fonts';
import { useFullscreen } from 'src/lib/providers/FullscreenProvider';

const copySuccess = () => {
  message.success('Link to this countdown was copied successfully!');
};

export const NumbersViewSettings: React.FC = () => {
  const {
    fontColor,
    changeFontColor,
    backgroundColor,
    changeBackgroundColor,
    changeFontSize,
    changeMsVisibility,
    lastUnit,
    changeLastUnit,
    changeUpdateInterval,
    updateInterval,
    changeFontFamily,
    fontFamily,
    showMs,
  } = useBigNumberOptions();
  const { enterFullscreen } = useFullscreen();
  const { location } = useReactRouter();

  return (
    <Wrap>
      <Tabs
        defaultActiveKey="1"
        animated={false}
        tabBarExtraContent={
          <React.Fragment>
            <Button
              shape="circle"
              icon="fullscreen"
              onClick={() => enterFullscreen(document.getElementById('bigNumber') as HTMLElement)}
            />

            <CopyToClipboard
              text={`${window.location.origin}${location.pathname}${location.search}`}
              onCopy={copySuccess}
            >
              <Button type="link" icon="copy">
                Save link
              </Button>
            </CopyToClipboard>
          </React.Fragment>
        }
      >
        <Tabs.TabPane tab="Units" key="1">
          <Row>
            <Col>
              <Control
                title="Last visible unit"
                content={
                  <Radio.Group
                    buttonStyle="solid"
                    value={lastUnit}
                    onChange={e => changeLastUnit(e.target.value as Unit)}
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
                      onChange={(e: CheckboxChangeEvent) => changeMsVisibility(e.target.checked)}
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
                      value={updateInterval}
                      onChange={value => changeUpdateInterval(value as number)}
                    />
                  </BlockHeight>
                }
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Font" key="2">
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
                    onChange={(val: string) => changeFontFamily(fonts[val])}
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
                        onChangeComplete={color => changeFontColor(color.hex)}
                      />
                    }
                  >
                    <Input value={fontColor} />
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
                    onChange={value => changeFontSize((((value as number) || 1) - 1) as FontSize)}
                  />
                }
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Background" key="3">
          <Row>
            <Col>
              <Control
                title="Color"
                content={
                  <Dropdown
                    overlay={
                      <ChromePicker
                        color={backgroundColor}
                        onChangeComplete={color => changeBackgroundColor(color.hex)}
                      />
                    }
                  >
                    <Input value={backgroundColor} />
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
