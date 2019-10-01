import React from 'react';
import { InputNumber, Button, Radio, Dropdown, Tabs, Select, Checkbox, Slider } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { TwitterPicker } from 'react-color';
import { Unit } from 'react-compound-timer';

import { Control } from '../Control';
import { useBigNumberOptions, FontSize } from 'src/lib/providers/BigNumberOptionsProvider';

import { Wrap, Row, Col, BlockHeight } from './NumbersViewSettings.styled';

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
  } = useBigNumberOptions();

  return (
    <Wrap>
      <Tabs defaultActiveKey="1" animated={false}>
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
                title="Update time"
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
                  <Select defaultValue="arial" style={{ width: 120 }}>
                    <Select.Option value="arial">Arial</Select.Option>
                    <Select.Option value="times">Times New Roman</Select.Option>
                    <Select.Option value="hevita">Hevita</Select.Option>
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
                      <TwitterPicker
                        color={fontColor}
                        onChange={color => changeFontColor(color.hex)}
                      />
                    }
                  >
                    <Button>Choose color</Button>
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
                      <TwitterPicker
                        color={backgroundColor}
                        onChange={color => changeBackgroundColor(color.hex)}
                      />
                    }
                  >
                    <Button>Choose color</Button>
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
