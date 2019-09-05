import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import useReactRouter from 'use-react-router';
import { useTimer } from 'react-compound-timer';
import { parse, format } from 'date-fns';

import { Container } from 'src/components/Layout/Container';
import { TimeLeft } from 'src/components/TimeLeft/TimeLeft';

import { Wrap, Header, Title, Description, Content } from './CalendarDayCountdown.styled';

const padUnit = (unit: number) => (unit < 10 ? `0${unit}` : unit);

export const CalendarDayCountdown: React.FC = () => {
  const {
    match: {
      params: { date },
    },
  } = useReactRouter<{ date: string }>();

  const jsDate = parse(date, 'MMMM-do-yyyy', new Date());
  const stringDate = format(jsDate, 'MMMM, do');
  const ts = jsDate.getTime();

  const {
    value: { d, h, m, s, ms },
    value,
  } = useTimer({
    initialTime: ts - Date.now(),
    lastUnit: 'd',
    direction: 'backward',
    timeToUpdate: 200,
  });

  const valueString = `${padUnit(d)} d ${padUnit(h)}:${padUnit(m)}:${padUnit(
    ms >= 500 ? s + 1 : s,
  )}`;

  useEffect(() => {
    document.title = valueString;
  }, [valueString]);

  return (
    <Container>
      <Wrap>
        <Header>
          <Title>
            <Typography variant="h4" component="h1">
              Time until day
            </Typography>
          </Title>
          <Description>
            <Typography variant="h5" component="h2">
              Momenter shows how much time left until {stringDate}.
            </Typography>
          </Description>
        </Header>
        <Content>
          <TimeLeft time={value} />
        </Content>
      </Wrap>
    </Container>
  );
};
