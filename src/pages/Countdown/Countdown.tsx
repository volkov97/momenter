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
import { CountdownControls } from 'src/components/CountdownControls/CountdownControls';

export const Countdown: React.FC = () => {
  const {
    location: { search },
  } = useReactRouter();
  const queryParams = queryString.parse(search);
  const targetTs = parseInt(queryParams.targetTs);

  useEffect(() => {
    if (targetTs) {
      ym('params', { 'countdown-param': targetTs });

      ga.event({
        category: 'target-page-params',
        action: 'countdown-param',
        value: targetTs,
      });
    }
  }, []);

  return (
    <BigNumberOptionsProvider targetTs={targetTs} autoplay={true}>
      <Container>
        <NumbersViewSettings controls={<CountdownControls />} />
      </Container>

      <Wrap>
        <BigNumber />
      </Wrap>
    </BigNumberOptionsProvider>
  );
};
