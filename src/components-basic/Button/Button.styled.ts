import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { buttonReset } from 'src/lib/styles/mixins/buttonReset';

const buttonStyles = css`
  ${buttonReset}

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 15px;

  height: 32px;

  font-size: 13px;
  font-weight: 400;
  text-align: center;
  line-height: 1.5;
  color: #fff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);

  border-color: #ff787e;
  border-radius: 4px;

  background-color: #ff787e;

  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  cursor: pointer;

  &:hover,
  &:focus {
    color: #fff;
    background-color: #f99da1;
    border-color: #f99da1;
  }

  svg {
    width: 13px;
    height: 13px;

    fill: #fff;
  }
`;

export const LinkWrap = styled(Link)`
  ${buttonStyles}
`;

export const ButtonWrap = styled.button`
  ${buttonStyles}
`;

export const ButtonIconWrap = styled(ButtonWrap)`
  padding: 0;
  width: 32px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ButtonIcon = styled.span<{ margin: 'left' | 'right' }>`
  display: inline-block;

  ${({ margin }) => `margin-${margin}: 15px`};

  font-size: 0;
`;

export const ButtonGroupWrap = styled.div`
  display: flex;

  & > ${LinkWrap}, & > ${ButtonWrap}, & > ${ButtonIconWrap} {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
