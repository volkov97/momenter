import React from 'react';
import Typography from '@material-ui/core/Typography';
import useReactRouter from 'use-react-router';
import { parse, format } from 'date-fns';

import { Container } from 'src/components/Layout/Container';
import { ShareLinks } from 'src/components/ShareLinks/ShareLinks';

import { Wrap, Header, Title, Description, Content, Share } from './CalendarDayCountdown.styled';
import { CountdownToDay } from './CountdownToDay/CountdownToDay';

export const CalendarDayCountdown: React.FC = () => {
  const {
    match: {
      params: { date },
    },
  } = useReactRouter<{ date: string }>();

  const jsDate = parse(date, 'MMMM-do-yyyy', new Date());
  const stringDate = format(jsDate, 'MMMM, do');

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
            <Share>
              <ShareLinks
                title={`How much time left until ${stringDate}?`}
                description={`Watch online countdown until ${stringDate} on Momenter!`}
              />
            </Share>
          </Description>
        </Header>
        <Content>
          <CountdownToDay date={jsDate} />
        </Content>
      </Wrap>
    </Container>
  );
};
