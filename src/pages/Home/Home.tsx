import React, { useRef, useEffect } from 'react';
import ym from 'react-yandex-metrika';
import queryString from 'query-string';
import { addMinutes, format } from 'date-fns';

import { Container } from 'src/components/Layout/Container';
import { DateSelector } from 'src/components/DateSelector/DateSelector';
import { Typography } from 'src/components-basic/Typography';
import { Divider } from 'src/components-basic/Divider';

import { Wrap } from './Home.styled';

export const Home: React.FC = () => {
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
          defaultDate={addMinutes(new Date(), 10)}
          buttonText="Start countdown"
          linkCreator={(date: Date) =>
            `/countdown?${queryString.stringify({ ts: date.getTime() })}`
          }
          onSubmit={() => {
            ym('reachGoal', 'btn-countdown-start-press', {
              'btn-countdown-start-press-ts': performance.now() - mountedTsRef.current,
            });
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
          linkCreator={(date: Date) => {
            const dayUrl = format(date, 'MMMM-do-yyyy').toLowerCase();

            return `/calendar/${dayUrl}`;
          }}
          onSubmit={(date: Date) => {
            const dayUrl = format(date, 'MMMM-do-yyyy').toLowerCase();

            ym('reachGoal', 'btn-show-day-info-press', {
              'btn-show-day-info-press-ts': performance.now() - mountedTsRef.current,
              'btn-show-day-info-press-value': dayUrl,
            });
          }}
        />
      </Wrap>
    </Container>
  );
};
