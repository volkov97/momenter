import React from 'react';
import { InputNumber, Button, Radio, Dropdown, Tabs, Select } from 'antd';
import { TwitterPicker } from 'react-color';

import { Control } from '../Control';

import { Wrap, Row, Col } from './NumbersViewSettings.styled';

export const NumbersViewSettings: React.FC = () => (
  <Wrap>
    <Tabs defaultActiveKey="1" animated={false}>
      <Tabs.TabPane tab="Units" key="1">
        <Row>
          <Col>
            <Control
              title="Visible units"
              content={
                <Radio.Group defaultValue="hours" buttonStyle="solid">
                  <Radio.Button value="hours">Hours</Radio.Button>
                  <Radio.Button value="minutes">Minutes</Radio.Button>
                  <Radio.Button value="seconds">Seconds</Radio.Button>
                </Radio.Group>
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
                <Dropdown overlay={<TwitterPicker />}>
                  <Button>Choose color</Button>
                </Dropdown>
              }
            />
          </Col>
          <Col>
            <Control title="Size" content={<InputNumber min={1} max={5} defaultValue={3} />} />
          </Col>
        </Row>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Background" key="3">
        <Row>
          <Col>
            <Control
              title="Color"
              content={
                <Dropdown overlay={<TwitterPicker />}>
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
