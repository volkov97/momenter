import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const TextContent = styled.div`
  margin-bottom: 30px;

  font-size: 24px;
  line-height: 1.4;

  ${media.mobile} {
    font-size: 20px;
  }
`;
