import React from 'react';

import { BigNumberOptionsProvider } from 'src/lib/providers/BigNumberOptionsProvider';

import { StopwatchControls } from 'src/components/StopwatchControls/StopwatchControls';
import { NumbersViewSettings } from 'src/components/NumbersViewSettings';
import { BigNumber } from 'src/components/BigNumber';
import { Container } from 'src/components/Layout/Container';
import { TimerValueProvider } from 'src/lib/providers/TimerValueProvider';
import { Wrap } from './Stopwatch.styled';

export const Stopwatch = () => {
  return (
    <BigNumberOptionsProvider ts={0}>
      <TimerValueProvider direction="forward">
        <Container>
          <NumbersViewSettings controls={<StopwatchControls />} />
        </Container>

        <Wrap>
          <BigNumber />
        </Wrap>
      </TimerValueProvider>
    </BigNumberOptionsProvider>
  );
};
