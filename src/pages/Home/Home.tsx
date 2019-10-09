import React, { useRef, useEffect } from 'react';
import ym from 'react-yandex-metrika';
import ga from 'react-ga';
import queryString from 'query-string';
import { endOfDay, addMinutes, format, addDays } from 'date-fns';
import { Typography, Divider } from 'antd';

import { TimerSelector } from 'src/components/TimerSelector';
import { Container } from 'src/components/Layout/Container';
import { DateSelector } from 'src/components/DateSelector/DateSelector';
import { Button } from 'src/components-basic/Button';

import { Wrap, ControlsRow } from './Home.styled';

export const Home: React.FC = () => {
  const mountedTsRef = useRef<number>(0);

  useEffect(() => {
    mountedTsRef.current = performance.now();
  }, []);

  return (
    <Container>
      <Wrap>
        <Typography.Paragraph>
          Just want to <Typography.Text mark={true}>start a timer</Typography.Text>?
          <br />
          Choose time form options above or write timer&apos;s initial time by yourself.
        </Typography.Paragraph>

        <TimerSelector />
      </Wrap>

      <Divider />

      <Wrap>
        <Typography.Paragraph>
          Just want to <Typography.Text mark={true}>start a stopwatch</Typography.Text>?
          <br />
          Measure the amount of time that elapses between its activation and deactivation.
        </Typography.Paragraph>

        <ControlsRow>
          <Button linkTo="/stopwatch">Start stopwatch</Button>
        </ControlsRow>
      </Wrap>

      <Divider />

      <Wrap>
        <Typography.Paragraph>
          Are you waiting for any events?
          <br />
          Choose date and time to <Typography.Text mark={true}>
            start a countdown
          </Typography.Text>{' '}
          to this event.
        </Typography.Paragraph>

        <DateSelector
          defaultDate={addMinutes(new Date(), 10)}
          minDate={addMinutes(new Date(), 1)}
          buttonText="Start countdown"
          linkCreator={(date: Date) =>
            `/countdown?${queryString.stringify({ ts: date.getTime() })}`
          }
          onSubmit={() => {
            ym('reachGoal', 'btn-countdown-start-press', {
              'btn-countdown-start-press-ts': performance.now() - mountedTsRef.current,
            });

            ga.event({
              category: 'btn-press-ts-from-navigate',
              action: 'btn-countdown-start-press-ts',
              value: performance.now() - mountedTsRef.current,
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
          defaultDate={endOfDay(addDays(new Date(), 1))}
          minDate={endOfDay(addDays(new Date(), 1))}
          linkCreator={(date: Date) => {
            const dayUrl = format(date, 'MMMM-do-yyyy').toLowerCase();

            return `/calendar/${dayUrl}`;
          }}
          onSubmit={() => {
            ym('reachGoal', 'btn-show-day-info-press', {
              'btn-show-day-info-press-ts': performance.now() - mountedTsRef.current,
            });

            ga.event({
              category: 'btn-press-ts-from-navigate',
              action: 'btn-show-day-info-press-ts',
              value: performance.now() - mountedTsRef.current,
            });
          }}
        />
      </Wrap>
    </Container>
  );
};
