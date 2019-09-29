import styled, { css } from 'styled-components';

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
