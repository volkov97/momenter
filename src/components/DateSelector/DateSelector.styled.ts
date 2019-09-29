import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${media.mobile} {
    flex-direction: column;

    align-items: flex-start;
  }
`;

export const Column = styled.div`
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }

  ${media.mobile} {
    margin-right: 0;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
