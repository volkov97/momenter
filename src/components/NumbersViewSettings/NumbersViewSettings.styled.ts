import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div`
  padding: 25px 0;

  ${media.mobile} {
    margin: 0 -20px;
    padding: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  padding-bottom: 20px;

  ${media.mobile} {
    overflow-x: auto;
  }
`;

export const Col = styled.div`
  margin-right: 15px;

  flex-shrink: 0;

  &:last-child {
    margin-right: 0;
  }

  ${media.mobile} {
    &:first-child {
      margin-left: 15px;
    }

    &:last-child {
      padding-right: 15px;
    }
  }
`;

export const BlockHeight = styled.div`
  display: flex;
  align-items: center;

  height: 30px;
`;
