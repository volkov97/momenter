import React from 'react';
import { Avatar, Button, Spin } from 'antd';

import { Container } from '../Layout/Container';

import { useCurrentUser } from 'src/lib/providers/CurrentUserProvider';
import { useDesktopOrHigher } from 'src/lib/hooks/useMedia';

import {
  Wrap,
  Inner,
  EmblemWrap,
  Emblem,
  EmblemImage,
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
          <EmblemWrap>
            <Emblem to="/">
              <EmblemImage src="/logo-with-emblem.png" />
            </Emblem>
          </EmblemWrap>

          <AuthControls>
            {isInitializing ? (
              <Spin />
            ) : user ? (
              <UserWrap>
                {isDesktopOrHigher ? <Name>{user.name}</Name> : null}

                <AvatarWrap>
                  <Avatar src={user.avatarUrl} />
                </AvatarWrap>

                <Button onClick={logOut} icon="logout" />
              </UserWrap>
            ) : (
              <Button onClick={logIn} icon="google">
                {isDesktopOrHigher ? 'Login with Google' : 'Login'}
              </Button>
            )}
          </AuthControls>
        </Inner>
      </Container>
    </Wrap>
  );
};
