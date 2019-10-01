import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div`
  border-bottom: 1px solid #e8e8e8;

  ${media.mobile} {
    margin: 0 -20px;
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
