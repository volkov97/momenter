import React from 'react';
import { Unit } from 'react-compound-timer';

import { Wrap } from './TimeValue.styled';
import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';
import { useTimerValue } from 'src/lib/providers/TimerValueProvider';

const unitWeight = {
  d: 600,
  h: 500,
  m: 400,
  s: 300,
  ms: 200,
};

const roundSeconds = (s: number, ms: number) => {
  if (ms >= 500 && s < 59) {
    return s + 1;
  }

  return s;
};

export const TimeValue: React.FC = () => {
  const { lastUnit, showMs } = useBigNumberOptions();
  const { value } = useTimerValue();

  return (
    <Wrap>
      {(['h', 'm', 's'] as Unit[]).map(unit =>
        unitWeight[unit] <= unitWeight[lastUnit] ? (
          <span key={unit}>
            {String(
              unit === 's' && !showMs ? roundSeconds(value[unit], value.ms) : value[unit],
            ).padStart(2, '0')}
            {unit !== 's' ? ':' : null}
          </span>
        ) : null,
      )}

      {showMs
        ? unitWeight.ms <= unitWeight[lastUnit]
          ? `:${String(value.ms).padStart(3, '0')}`
          : null
        : null}
    </Wrap>
  );
};
