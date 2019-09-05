import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrap = styled.div`
  width: 345px;

  overflow: hidden;

  border-radius: 4px;

  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const ImageWrap = styled.div`
  position: relative;

  overflow: hidden;
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const ImageLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
`;

export const ContentWrap = styled.div`
  padding: 15px;
`;

export const Actions = styled.div`
  padding: 0 15px 15px;
`;

export const Action = styled.div``;
