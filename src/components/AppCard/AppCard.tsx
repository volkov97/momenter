import React from 'react';

import useRouter from 'use-react-router';

import Typography from '@material-ui/core/Typography';

import { Wrap, ImageWrap, Image, ImageLink, ContentWrap, Actions, Action } from './AppCard.styled';
import { Button } from '@material-ui/core';

interface AppCardProps {
  title: string;
  description: string;
  src: string;
}

export const AppCard: React.FC<AppCardProps> = ({ title, description, src }) => {
  const { history } = useRouter();

  return (
    <Wrap>
      <ImageWrap>
        <Image src={src} width="345" height="195" />
        <ImageLink to="/calendar" />
      </ImageWrap>
      <ContentWrap>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </ContentWrap>
      <Actions>
        <Action>
          <Button variant="outlined" onClick={() => history.push('/calendar')}>
            Open
          </Button>
        </Action>
      </Actions>
    </Wrap>
  );
};
