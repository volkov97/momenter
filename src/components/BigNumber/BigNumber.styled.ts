import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const adaptiveFont = {
  large: [2, 6, 10, 14, 18],
  desktop: [2, 6, 8, 10, 14],
  tablet: [2, 4, 6, 8, 10],
  mobile: [2, 3, 4, 5, 6],
};

export const TextWrap = styled.div<{ fontSize: number }>`
  font-size: ${({ fontSize }) => adaptiveFont.large[fontSize]}em;
  line-height: 1;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  line-height: 1;

  ${media.desktop} {
    font-size: ${({ fontSize }) => adaptiveFont.desktop[fontSize]}em;
  }

  ${media.tablet} {
    font-size: ${({ fontSize }) => adaptiveFont.tablet[fontSize]}em;
  }

  ${media.mobile} {
    font-size: ${({ fontSize }) => adaptiveFont.mobile[fontSize]}em;
  }
`;
