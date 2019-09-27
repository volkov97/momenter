import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { media } from './lib/styles/mixins/media';

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

    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #393e42;

    background-color: #fff;
  }

  @supports (font-variation-settings: normal) {
    body { font-family: 'Inter var', sans-serif; }
  }

  ${media.mobile} {
    .am-list-item {
      margin-left: -20px;
      margin-right: -20px;
      padding-left: 20px !important;

      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;

      .am-list-line .am-list-extra {
        flex-basis: auto !important;
      }
    }
  }
`;
