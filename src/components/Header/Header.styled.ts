import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from 'src/lib/styles/mixins/media';

export const Wrap = styled.div`
  padding: 10px 0;

  background-color: #fff;

  border-bottom: 1px solid #e8e8e8;
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Emblem = styled(Link)`
  display: flex;
  align-items: center;

  h1,
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const Logo = styled.div`
  margin-right: 10px;

  width: 50px;
  height: 50px;

  ${media.tablet} {
    width: 40px;
    height: 40px;
  }
`;

export const AuthControls = styled.div``;

export const UserWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarWrap = styled.div`
  margin-right: 10px;
`;

export const Name = styled.div`
  margin-right: 10px;
`;
