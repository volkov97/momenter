import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrap = styled.div`
  padding: 10px 0;

  background-color: #fff;

  border-bottom: 1px solid #e8e8e8;
`;

export const Inner = styled.div`
  display: flex;
`;

export const Emblem = styled(Link)`
  display: flex;
  align-items: center;

  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const Logo = styled.div`
  margin-right: 10px;

  width: 50px;
  height: 50px;
`;
