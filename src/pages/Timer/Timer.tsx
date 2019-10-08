import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import ym from 'react-yandex-metrika';
import ga from 'react-ga';
import queryString from 'query-string';

import { BigNumberOptionsProvider } from 'src/lib/providers/BigNumberOptionsProvider';

import { Wrap } from './Timer.styled';
import { NumbersViewSettings } from 'src/components/NumbersViewSettings';
import { BigNumber } from 'src/components/BigNumber';
import { Container } from 'src/components/Layout/Container';
import { TimerControls } from 'src/components/TimerControls/TimerControls';

export const Timer = () => {
  const {
    location: { search },
  } = useReactRouter();
  const queryParams = queryString.parse(search);
  const ts = parseInt(queryParams.ts);

  useEffect(() => {
    if (ts) {
      ym('params', { 'timer-param': ts });

      ga.event({
        category: 'url-params',
        action: 'timer-param',
        value: ts,
      });
    }
  }, []);

  return (
    <BigNumberOptionsProvider ts={ts}>
      <Container>
        <NumbersViewSettings controls={<TimerControls />} />
      </Container>

      <Wrap>
        <BigNumber />
      </Wrap>
    </BigNumberOptionsProvider>
  );
};
