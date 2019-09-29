import React from 'react';

import { Wrap, Image } from './Avatar.styled';

interface AvatarProps {
  src: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src }) => (
  <Wrap>
    <Image src={src} />
  </Wrap>
);
