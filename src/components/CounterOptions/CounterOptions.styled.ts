import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div``;

export const Line = styled.div`
  display: flex;

  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;

export const Option = styled.div`
  margin-right: 20px;

  ${media.mobile} {
    margin: 0 0 15px;

    & > div {
      width: 100%;
    }
  }
`;
