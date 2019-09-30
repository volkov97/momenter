import styled from 'styled-components';

export const Wrap = styled.div``;

export const TimerOptions = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-top: -10px;
  margin-bottom: 15px;
`;

export const TimerOption = styled.div`
  margin-top: 10px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

export const TimeSetter = styled.div`
  display: flex;
`;

export const TimeStart = styled.div`
  margin-left: 10px;
`;
