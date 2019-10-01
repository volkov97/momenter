import React from 'react';

import { Wrap, Title, Content } from './Control.styled';
import { Typography } from 'antd';

interface ControlProps {
  title: string;
  content: React.ReactNode;
}

export const Control: React.FC<ControlProps> = ({ title, content }) => (
  <Wrap>
    <Title>
      <Typography.Text>{title}</Typography.Text>
    </Title>
    <Content>{content}</Content>
  </Wrap>
);
