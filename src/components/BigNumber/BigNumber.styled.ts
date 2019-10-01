import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div`
  font-size: 10em;
  line-height: 1;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  line-height: 1;

  ${media.desktop} {
    font-size: 8em;
  }

  ${media.tablet} {
    font-size: 6em;
  }

  ${media.mobile} {
    font-size: 4em;
  }
`;
