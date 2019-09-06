import React from 'react';
import Typography from '@material-ui/core/Typography';
import useReactRouter from 'use-react-router';
import { parse, format } from 'date-fns';

import { Container } from 'src/components/Layout/Container';
import { ShareLinks } from 'src/components/ShareLinks/ShareLinks';

import { CountdownToDay } from './CountdownToDay/CountdownToDay';

import {
  dayOfWeek,
  daysFromYearStart,
  daysUntilNextFriday,
  daysUntilNextSaturday,
  daysUntilEndOfYear,
} from 'src/lib/helpers/dayInfo';

import {
  Wrap,
  Header,
  Title,
  Description,
  Content,
  Share,
  Info,
  InfoItem,
  InfoHeader,
  InfoContent,
} from './CalendarDayCountdown.styled';

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
            <Typography variant="h5" component="h3">
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
        <Info>
          {[
            { title: `What day of the week is ${stringDate}?`, text: dayOfWeek(jsDate) },
            {
              title: `How many days from start of the year until ${stringDate}?`,
              text: daysFromYearStart(jsDate),
            },
            {
              title: `How many days from ${stringDate} until the end of the year?`,
              text: daysUntilEndOfYear(jsDate),
            },
            {
              title: `How many days from ${stringDate} until next Saturday?`,
              text: daysUntilNextSaturday(jsDate),
            },
            {
              title: `How many days from ${stringDate} until next Friday?`,
              text: daysUntilNextFriday(jsDate),
            },
          ].map(item => (
            <InfoItem key={item.title}>
              <InfoHeader>
                <Typography variant="h5" component="h3">
                  {item.title}
                </Typography>
              </InfoHeader>
              <InfoContent>
                <Typography variant="h5" component="p">
                  {item.text}
                </Typography>
              </InfoContent>
            </InfoItem>
          ))}
        </Info>
      </Wrap>
    </Container>
  );
};
