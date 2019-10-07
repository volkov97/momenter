import React, { useEffect } from 'react';

import { Wrap, TextWrap } from './BigNumber.styled';
import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { TimeValue } from '../TimeValue';

export const BigNumber: React.FC = () => {
  const {
    fontColor,
    backgroundColor,
    fontSize,
    lastUnit,
    updateInterval,
    fontFamily,
    timer,
  } = useBigNumberOptions();

  useEffect(() => {
    timer.controls.setLastUnit(lastUnit);
  }, [lastUnit]);

  useEffect(() => {
    timer.controls.setTimeToUpdate(updateInterval);
  }, [updateInterval]);

  return (
    <Wrap id="bigNumber" style={{ backgroundColor }}>
      <TextWrap style={{ color: fontColor, fontFamily }} fontSize={fontSize}>
        <TimeValue />
      </TextWrap>
    </Wrap>
  );
};
