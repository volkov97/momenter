import React, { useEffect } from 'react';
import ym from 'react-yandex-metrika';
import useReactRouter from 'use-react-router';
import queryString from 'query-string';

import { Wrap } from './Countdown.styled';
import { BigNumber } from 'src/components/BigNumber';

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
    <Wrap>
      <BigNumber ts={ts - Date.now()} />
    </Wrap>
  );
};
