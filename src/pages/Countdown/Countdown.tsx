import React, { useEffect } from 'react';
import ym from 'react-yandex-metrika';
import useReactRouter from 'use-react-router';
import queryString from 'query-string';

import { Wrap } from './Countdown.styled';
import { BigNumber } from 'src/components/BigNumber';
import { Container } from 'src/components/Layout/Container';
import { BigNumberOptionsProvider } from 'src/lib/providers/BigNumberOptionsProvider';
import { NumbersViewSettings } from 'src/components/NumbersViewSettings';

export const Countdown: React.FC = () => {
  const {
    location: { search },
  } = useReactRouter();
  const queryParams = queryString.parse(search);
  const ts = parseInt(queryParams.ts);

  useEffect(() => {
    if (ts) {
      ym('params', { 'countdown-param': ts });
    }
  }, []);

  return (
    <BigNumberOptionsProvider>
      <Container>
        <NumbersViewSettings />
      </Container>

      <Wrap>
        <BigNumber ts={ts - Date.now()} />
      </Wrap>
    </BigNumberOptionsProvider>
  );
};
