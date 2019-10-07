import React, { useEffect } from 'react';
import ym from 'react-yandex-metrika';
import ga from 'react-ga';
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

      ga.event({
        category: 'target-page-params',
        action: 'countdown-param',
        value: ts,
      });
    }
  }, []);

  return (
    <BigNumberOptionsProvider ts={ts - Date.now()} autoplay={true}>
      <Container>
        <NumbersViewSettings showControls={false} />
      </Container>

      <Wrap>
        <BigNumber />
      </Wrap>
    </BigNumberOptionsProvider>
  );
};
