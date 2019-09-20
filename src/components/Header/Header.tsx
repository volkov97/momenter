import React from 'react';
import { Typography, Spin, Button, Avatar, Tooltip } from 'antd';

import { Container } from '../Layout/Container';
import { MomenterIcon } from '../__icons__/MomenterIcon';

import { useCurrentUser } from 'src/lib/providers/CurrentUserProvider';
import { useDesktopOrHigher } from 'src/lib/hooks/useMedia';

import {
  Wrap,
  Inner,
  Emblem,
  Logo,
  AuthControls,
  UserWrap,
  AvatarWrap,
  Name,
} from './Header.styled';

export const Header = () => {
  const { user, isInitializing, logIn, logOut } = useCurrentUser();
  const isDesktopOrHigher = useDesktopOrHigher();

  return (
    <Wrap>
      <Container>
        <Inner>
          <Emblem to="/">
            <Logo>
              <MomenterIcon />
            </Logo>
            <Typography.Title level={isDesktopOrHigher ? 1 : 3}>Momenter</Typography.Title>
          </Emblem>

          <AuthControls>
            {isInitializing ? (
              <Spin />
            ) : user ? (
              <UserWrap>
                {isDesktopOrHigher ? <Name>{user.name}</Name> : null}

                <AvatarWrap>
                  <Avatar src={user.avatarUrl} shape="square" size="large" />
                </AvatarWrap>

                <Tooltip placement="bottom" title="Logout">
                  <Button onClick={logOut} icon="logout" size="large" />
                </Tooltip>
              </UserWrap>
            ) : (
              <Button type="primary" onClick={logIn} icon="google">
                {isDesktopOrHigher ? 'Login with Google' : 'Login'}
              </Button>
            )}
          </AuthControls>
        </Inner>
      </Container>
    </Wrap>
  );
};
