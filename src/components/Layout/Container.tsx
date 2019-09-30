import styled from 'styled-components';
import { media } from '../../lib/styles/mixins/media';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;

  max-width: 840px;

  width: 100%;

  ${media.tablet} {
    max-width: 100%;
  }
`;
