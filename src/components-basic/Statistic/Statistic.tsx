import React from 'react';

import { Wrap, Title, Value } from './Statistic.styled';

interface StatisticProps {
  title: string;
  value: string;
}

export const Statistic: React.FC<StatisticProps> = ({ title, value }) => (
  <Wrap>
    <Title>{title}</Title>
    <Value>{value}</Value>
  </Wrap>
);
