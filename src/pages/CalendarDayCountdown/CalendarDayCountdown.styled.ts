import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div`
  padding: 40px 0 50px;
`;

export const Header = styled.div``;

export const Title = styled.header`
  margin-bottom: 20px;
`;

export const Description = styled.div``;

export const Content = styled.div`
  padding: 30px 0;
`;

export const Share = styled.div`
  padding-top: 15px;
`;

export const Info = styled.div``;

export const InfoItem = styled.div`
  margin-bottom: 20px;
`;

export const InfoHeader = styled.div`
  margin-bottom: 10px;
`;

export const InfoContent = styled.div``;

export const Navigation = styled.div`
  display: flex;

  align-items: center;

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BreadcrumbsWrap = styled.div`
  margin-right: 20px;

  ${media.tablet} {
    margin-right: 0;
  }
`;

export const SiblingDays = styled.div`
  display: flex;
`;

export const SiblingDay = styled(Link)`
  margin-right: 10px;

  color: #1976d2;
  text-decoration: none;

  &:last-child {
    margin-right: 0;
  }
`;
