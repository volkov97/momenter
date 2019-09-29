import React from 'react';

import { LinkWrap, ButtonWrap, ButtonIcon, ButtonIconWrap, ButtonGroupWrap } from './Button.styled';

interface ButtonProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  linkTo?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  linkTo,
  onClick,
  leftIcon,
  rightIcon,
  icon,
  children,
}) => {
  const onClickHandler = onClick || (() => {});

  const content = (
    <React.Fragment>
      {leftIcon ? <ButtonIcon margin="right">{leftIcon}</ButtonIcon> : null}

      {children}

      {icon || null}

      {rightIcon ? <ButtonIcon margin="left">{rightIcon}</ButtonIcon> : null}
    </React.Fragment>
  );

  const commonProps = {
    onClick: onClickHandler,
    children: content,
  };

  if (icon) {
    return <ButtonIconWrap {...commonProps} />;
  }

  if (linkTo) {
    return <LinkWrap to={linkTo} {...commonProps} />;
  }

  return <ButtonWrap {...commonProps} />;
};

export const ButtonGroup: React.FC = ({ children }) => (
  <ButtonGroupWrap>{children}</ButtonGroupWrap>
);
