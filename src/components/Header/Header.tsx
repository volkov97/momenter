import React from 'react';
import { Typography } from 'antd';

import { Container } from '../Layout/Container';
import { MomenterIcon } from '../__icons__/MomenterIcon';

import { Wrap, Inner, Emblem, Logo } from './Header.styled';

export const Header = () => {
  return (
    <Wrap>
      <Container>
        <Inner>
          <Emblem to="/">
            <Logo>
              <MomenterIcon />
            </Logo>
            <Typography.Title>Momenter</Typography.Title>
          </Emblem>
        </Inner>
      </Container>
    </Wrap>
  );
};
