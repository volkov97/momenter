import styled, { css } from 'styled-components';
import { media } from 'src/lib/styles/mixins/media';
import { Link } from 'react-router-dom';

export const Wrap = styled.div``;

export const Month = styled.div`
  margin-bottom: 20px;
`;

export const MonthHeader = styled.div`
  padding: 30px 20px 20px;

  border-bottom: 4px solid #9e9e9e;
`;

export const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const width = 100 / 7;

export const DaySquare = styled.div<{ isEmpty?: boolean; isFirst?: boolean }>`
  position: relative;

  padding-bottom: ${width}%;

  width: ${width}%;

  border-right: ${({ isEmpty }) => (isEmpty ? 'none' : '1px solid #9e9e9e')};
  border-bottom: 1px solid #9e9e9e;

  &:nth-child(7n) {
    border-right: none;
  }
`;

export const DaySquareContent = styled.div<{ isEmpty?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: #fff;

  padding: 15px;

  ${({ isEmpty }) =>
    isEmpty &&
    css`
      opacity: 0.2;
    `}

  ${media.tablet} {
    padding: 5px;
  }
`;

export const DayDate = styled.div`
  margin-bottom: 5px;
`;

export const DayLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Badges = styled.div`
  display: flex;
  align-items: flex-start;

  ${media.mobile} {
    display: none;
  }
`;

export const Badge = styled.div<{ color: string }>`
  margin-right: 5px;

  padding: 4px 15px;

  font-size: 12px;
  color: #fff;

  background-color: ${({ color }) => color};

  border-radius: 15px;

  &:last-child {
    margin-right: 0;
  }
`;
