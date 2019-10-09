import React from 'react';

import { Wrap, TextWrap } from './BigNumber.styled';
import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { TimeValue } from '../TimeValue';

export const BigNumber: React.FC = () => {
  const { fontColor, backgroundColor, fontSize, fontFamily } = useBigNumberOptions();

  return (
    <Wrap id="bigNumber" style={{ backgroundColor }}>
      <TextWrap style={{ color: fontColor, fontFamily }} fontSize={fontSize}>
        <TimeValue />
      </TextWrap>
    </Wrap>
  );
};
