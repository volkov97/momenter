import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { flatpickr } from './lib/styles/libs/flatpickr';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}
  ${flatpickr}

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-width: 320px;
    height: 100%;
    min-height: 100%;

    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #393e42;

    background-color: #fff;
  }

  @supports (font-variation-settings: normal) {
    body { font-family: 'Inter var', sans-serif; }
  }

  a {
    text-decoration: none;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100%;
`;

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
`;
