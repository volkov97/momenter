import React, { useEffect } from 'react';

import { Wrap, TextWrap } from './BigNumber.styled';
import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { TimeValue } from '../TimeValue';
import { useTimerValue } from 'src/lib/providers/TimerValueProvider';

export const BigNumber: React.FC = () => {
  const {
    fontColor,
    backgroundColor,
    fontSize,
    lastUnit,
    updateInterval,
    fontFamily,
  } = useBigNumberOptions();
  const { controls } = useTimerValue();

  useEffect(() => {
    controls.setLastUnit(lastUnit);
  }, [lastUnit]);

  useEffect(() => {
    controls.setTimeToUpdate(updateInterval);
  }, [updateInterval]);

  return (
    <Wrap id="bigNumber" style={{ backgroundColor }}>
      <TextWrap style={{ color: fontColor, fontFamily }} fontSize={fontSize}>
        <TimeValue />
      </TextWrap>
    </Wrap>
  );
};
