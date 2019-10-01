import React, { useEffect } from 'react';
import { useTimer } from 'react-compound-timer';

import { Wrap, TextWrap } from './BigNumber.styled';
import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { TimeValue } from '../TimeValue';

interface BigNumberProps {
  ts: number;
}

export const BigNumber: React.FC<BigNumberProps> = ({ ts }) => {
  const {
    fontColor,
    backgroundColor,
    fontSize,
    lastUnit,
    updateInterval,
    fontFamily,
  } = useBigNumberOptions();

  const {
    value,
    controls: { setLastUnit, setTimeToUpdate },
  } = useTimer({
    initialTime: ts,
    lastUnit,
    direction: 'backward',
    timeToUpdate: updateInterval,
  });

  useEffect(() => {
    setLastUnit(lastUnit);
  }, [lastUnit]);

  useEffect(() => {
    setTimeToUpdate(updateInterval);
  }, [updateInterval]);

  return (
    <Wrap id="bigNumber" style={{ backgroundColor }}>
      <TextWrap style={{ color: fontColor, fontFamily }} fontSize={fontSize}>
        <TimeValue value={value} />
      </TextWrap>
    </Wrap>
  );
};
