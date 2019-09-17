import React, { useRef, useEffect } from 'react';
import ym from 'react-yandex-metrika';
import useReactRouter from 'use-react-router';
import queryString from 'query-string';
import { Typography, Divider } from 'antd';
import moment from 'moment';

import { Container } from 'src/components/Layout/Container';
import { DateSelector } from 'src/components/DateSelector/DateSelector';

import { Wrap } from './Home.styled';
import { format } from 'date-fns';

export const Home: React.FC = () => {
  const { history } = useReactRouter();

  const mountedTsRef = useRef<number>(0);

  useEffect(() => {
    mountedTsRef.current = performance.now();
  }, []);

  return (
    <Container>
      <Wrap>
        <Typography.Paragraph>
          Are you waiting for any events?
          <br />
          Choose date and time to <Typography.Text mark={true}>see a countdown</Typography.Text> to
          this event.
        </Typography.Paragraph>

        <DateSelector
          defaultDate={moment().add(10, 'minutes')}
          buttonText="Start countdown"
          onSubmit={(ts: number) => {
            ym('reachGoal', 'btn-countdown-start-press', {
              'btn-countdown-start-press-ts': performance.now() - mountedTsRef.current,
            });

            history.push(`/countdown?${queryString.stringify({ ts })}`);
          }}
        />
      </Wrap>

      <Divider />

      <Wrap>
        <Typography.Paragraph>
          Do you want to know more about any date?
          <br />
          Choose date and <Typography.Text mark={true}>
            read some interesting info
          </Typography.Text>{' '}
          about this day.
        </Typography.Paragraph>

        <DateSelector
          buttonText="Show info"
          showTime={false}
          onSubmit={(ts: number) => {
            const dayUrl = format(ts, 'MMMM-do-yyyy').toLowerCase();

            ym('reachGoal', 'btn-show-day-info-press', {
              'btn-show-day-info-press-ts': performance.now() - mountedTsRef.current,
              'btn-show-day-info-press-value': dayUrl,
            });

            history.push(`/calendar/${dayUrl}`);
          }}
        />
      </Wrap>
    </Container>
  );
};
