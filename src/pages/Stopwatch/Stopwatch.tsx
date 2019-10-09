import React from 'react';

import { BigNumberOptionsProvider } from 'src/lib/providers/BigNumberOptionsProvider';

import { StopwatchControls } from 'src/components/StopwatchControls/StopwatchControls';
import { NumbersViewSettings } from 'src/components/NumbersViewSettings';
import { BigNumber } from 'src/components/BigNumber';
import { Container } from 'src/components/Layout/Container';
import { Wrap } from './Stopwatch.styled';
import { StopwatchValueProvider } from 'src/lib/providers/StopwatchValueProvider';

export const Stopwatch = () => {
  return (
    <BigNumberOptionsProvider>
      <StopwatchValueProvider>
        <Container>
          <NumbersViewSettings controls={<StopwatchControls />} />
        </Container>

        <Wrap>
          <BigNumber />
        </Wrap>
      </StopwatchValueProvider>
    </BigNumberOptionsProvider>
  );
};
