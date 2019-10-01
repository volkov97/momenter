import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import ym from 'react-yandex-metrika';
import queryString from 'query-string';

import { BigNumberOptionsProvider } from 'src/lib/providers/BigNumberOptionsProvider';

import { Wrap } from './Timer.styled';
import { NumbersViewSettings } from 'src/components/NumbersViewSettings';
import { BigNumber } from 'src/components/BigNumber';
import { Container } from 'src/components/Layout/Container';

export const Timer = () => {
  const {
    location: { search },
  } = useReactRouter();
  const queryParams = queryString.parse(search);
  const ts = parseInt(queryParams.ts);

  useEffect(() => {
    if (ts) {
      ym('params', { 'timer-param': ts });
    }
  }, []);

  return (
    <BigNumberOptionsProvider>
      <Container>
        <NumbersViewSettings />
      </Container>

      <Wrap>
        <BigNumber ts={ts} />
      </Wrap>
    </BigNumberOptionsProvider>
  );
};
