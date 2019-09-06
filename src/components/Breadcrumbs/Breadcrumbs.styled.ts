import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrap = styled.nav`
  display: flex;
`;

export const ItemLink = styled(Link)`
  margin-left: 10px;

  color: #1976d2;
  text-decoration: none;

  &:first-child {
    margin-left: 0;
  }
`;
