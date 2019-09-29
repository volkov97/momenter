import styled from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 40px 0 20px;

  h2 {
    margin-bottom: 0;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;

    padding: 20px 0 10px;

    h2 {
      margin-bottom: 10px;
    }
  }
`;

export const ToolbarTitle = styled.div`
  ${media.mobile} {
    margin-bottom: 5px;
  }
`;

export const Content = styled.div`
  padding: 20px 0;

  ${media.mobile} {
    padding: 0 0 25px;
  }
`;

export const Share = styled.div``;

export const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 25px;
  margin-bottom: 25px;

  ${media.mobile} {
    margin-bottom: 15px;
  }
`;

export const InfoItem = styled.div`
  margin-right: 20px;

  ${media.mobile} {
    margin-right: 0;
    margin-bottom: 10px;

    width: 50%;
  }
`;

export const InfoContent = styled.div``;

export const SiblingDays = styled.div`
  display: flex;
`;
