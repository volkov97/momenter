import React from 'react';
import { TimerValue, Unit } from 'react-compound-timer';

import { Wrap } from './TimeValue.styled';
import { useBigNumberOptions } from 'src/lib/providers/BigNumberOptionsProvider';

const unitWeight = {
  d: 600,
  h: 500,
  m: 400,
  s: 300,
  ms: 200,
};

interface TimeValueProps {
  value: TimerValue;
}

export const TimeValue: React.FC<TimeValueProps> = ({ value }) => {
  const { lastUnit, showMs } = useBigNumberOptions();

  return (
    <Wrap>
      {(['h', 'm', 's'] as Unit[]).map(unit =>
        unitWeight[unit] <= unitWeight[lastUnit] ? (
          <span key={unit}>
            {String(value[unit]).padStart(2, '0')}
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
