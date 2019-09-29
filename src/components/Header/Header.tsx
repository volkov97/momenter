import React from 'react';
import { Button } from 'src/components-basic/Button';
import { Avatar } from 'src/components-basic/Avatar';
import { Typography } from 'src/components-basic/Typography';
import { Spin } from 'src/components-basic/Spin';

import { Container } from '../Layout/Container';
import { MomenterIcon } from '../__icons__/MomenterIcon';
import { GoogleIcon } from '../__icons__/GoogleIcon';
import { LogoutIcon } from '../__icons__/LogoutIcon';

import { useCurrentUser } from 'src/lib/providers/CurrentUserProvider';
import { useDesktopOrHigher } from 'src/lib/hooks/useMedia';

import {
  Wrap,
  Inner,
  EmblemWrap,
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
          <EmblemWrap>
            <Logo>
              <Emblem to="/">
                <MomenterIcon />
              </Emblem>
            </Logo>

            <Typography.Title level={isDesktopOrHigher ? 1 : 3}>
              <Emblem to="/">Momenter</Emblem>
            </Typography.Title>
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

                <Button onClick={logOut} icon={<LogoutIcon />} />
              </UserWrap>
            ) : (
              <Button onClick={logIn} leftIcon={<GoogleIcon />}>
                {isDesktopOrHigher ? 'Login with Google' : 'Login'}
              </Button>
            )}
          </AuthControls>
        </Inner>
      </Container>
    </Wrap>
  );
};
