import React, { useState, useMemo } from 'react';
import useReactRouter from 'use-react-router';
import { DatePicker, Button } from 'antd';
import queryString from 'query-string';
import moment from 'moment';

import { Container } from 'src/components/Layout/Container';

import { HeaderLarge } from 'src/components/Layout/Header';
import { TextContent } from 'src/components/Layout/TextContent';

import { Wrap, Controls, Control } from './Home.styled';

export const Home: React.FC = () => {
  const [ts, setTs] = useState<moment.Moment | undefined>(undefined);

  const { history } = useReactRouter();

  const query = useMemo(() => {
    if (ts) {
      return queryString.stringify({
        ts: ts.valueOf(),
      });
    }

    return 0;
  }, [ts]);

  return (
    <Container>
      <Wrap>
        <HeaderLarge>Momenter</HeaderLarge>

        <TextContent>
          Are you waiting for something? See the counter tick down to this event.
          <br />
          Just choose date and time in the inputs below and hit start button.
        </TextContent>

        <Controls>
          <Control>
            <DatePicker size="large" showTime={true} value={ts} onChange={ts => ts && setTs(ts)} />
          </Control>
          <Control>
            <Button size="large" type="primary" onClick={() => history.push(`/countdown?${query}`)}>
              Start countdown
            </Button>
          </Control>
        </Controls>
      </Wrap>
    </Container>
  );
};
