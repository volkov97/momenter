import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  * {
    box-sizing: border-box;
  }

  body,
  #root {
    width: 100%;
    min-width: 320px;
    height: 100%;
    min-height: 100%;

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #393e42;
  }
`;
