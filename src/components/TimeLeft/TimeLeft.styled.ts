import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div`
  display: flex;

  ${media.mobile} {
    flex-direction: column;
  }
`;

export const TimeUnit = styled.div`
  display: flex;

  margin-right: 20px;

  font-size: 2em;
  line-height: 1.2;

  &:last-child {
    margin-right: 0;
  }

  ${media.mobile} {
    font-size: 1.4em;
    line-height: 1.4;
  }
`;

export const TimeUnitName = styled.div`
  text-align: left;
`;

export const TimeUnitValue = styled.div`
  margin-right: 10px;

  text-align: right;
  color: black;
`;

export const InvisibleDigit = styled.span`
  opacity: 0;
`;
