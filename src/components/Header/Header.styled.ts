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

export const EmblemWrap = styled.div`
  display: flex;
  align-items: center;

  h1,
  h3 {
    margin: 0;
  }
`;

export const Emblem = styled(Link)`
  color: #000;
`;

export const EmblemImage = styled.img`
  height: 50px;

  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  ${media.tablet} {
    height: 40px;

    &:hover {
      transform: none;
    }
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
