import React from 'react';
import ym from 'react-yandex-metrika';
import useRouter from 'use-react-router';
import {
  FacebookShareButton,
  FacebookIcon,
  VKShareButton,
  VKIcon,
  OKShareButton,
  OKIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

import { Wrap, List, Item } from './ShareLinks.styled';

export const ShareLinks = () => {
  const {
    location: { pathname },
  } = useRouter();

  const sharingUrl = `${window.location.origin}${pathname}`;
  const ICON_SIZE = 40;

  const createBeforeOnClick = (network: string) => () => {
    ym('reachGoal', 'btn-calendar-day-share-press', {
      [`btn-calendar-day-share-${network}-press-ts`]: network,
    });

    return Promise.resolve();
  };

  return (
    <Wrap>
      <List>
        {[
          <FacebookShareButton
            key="facebook"
            url={sharingUrl}
            beforeOnClick={createBeforeOnClick('facebook')}
          >
            <FacebookIcon size={ICON_SIZE} round={true} />
          </FacebookShareButton>,
          <VKShareButton key="vk" url={sharingUrl} beforeOnClick={createBeforeOnClick('vk')}>
            <VKIcon size={ICON_SIZE} round={true} />
          </VKShareButton>,
          <OKShareButton key="ok" url={sharingUrl} beforeOnClick={createBeforeOnClick('ok')}>
            <OKIcon size={ICON_SIZE} round={true} />
          </OKShareButton>,
          <LinkedinShareButton
            key="linkedin"
            url={sharingUrl}
            beforeOnClick={createBeforeOnClick('linkedin')}
          >
            <LinkedinIcon size={ICON_SIZE} round={true} />
          </LinkedinShareButton>,
          <TwitterShareButton
            key="twitter"
            url={sharingUrl}
            beforeOnClick={createBeforeOnClick('twitter')}
          >
            <TwitterIcon size={ICON_SIZE} round={true} />
          </TwitterShareButton>,
        ].map((btn, index) => (
          <Item key={index}>{btn}</Item>
        ))}
      </List>
    </Wrap>
  );
};
