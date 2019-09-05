import styled from 'styled-components';

export const Wrap = styled.div`
  display: inline-block;
`;

export const TimeUnit = styled.div`
  display: flex;

  margin-bottom: 20px;
`;

export const TimeUnitName = styled.div`
  color: grey;

  text-align: left;
`;

export const TimeUnitValue = styled.div`
  margin-right: 20px;

  text-align: right;

  font-variant-numeric: tabular-nums;
`;

export const InvisibleDigit = styled.span`
  opacity: 0;
`;
