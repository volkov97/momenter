import styled, { css } from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const ParagraphWrap = styled.div`
  margin-bottom: 20px;
`;

const headerStyles = css`
  margin: 0;
  padding: 0;

  font-weight: 700;
  line-height: 1.2;
`;

export const Title1Wrap = styled.h1`
  ${headerStyles}

  font-size: 38px;
`;

export const Title2Wrap = styled.h2`
  ${headerStyles}

  font-size: 30px;
`;

export const Title3Wrap = styled.h3`
  ${headerStyles}

  font-size: 24px;
`;

export const TextWrap = styled.span``;

export const NumberWrap = styled.span`
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
