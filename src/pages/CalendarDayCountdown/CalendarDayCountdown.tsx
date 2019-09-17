import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Typography, Statistic, Icon, Divider } from 'antd';
import useReactRouter from 'use-react-router';
import { parse, format, addDays, subDays } from 'date-fns';

import { Container } from 'src/components/Layout/Container';
import { ShareLinks } from 'src/components/ShareLinks/ShareLinks';

import { CountdownToDay } from './CountdownToDay/CountdownToDay';

import {
  dayOfWeek,
  daysFromYearStart,
  daysUntilNextFriday,
  daysUntilEndOfYear,
} from 'src/lib/helpers/dayInfo';

import { Toolbar, Content, Info, InfoItem, SiblingDays } from './CalendarDayCountdown.styled';
import { mediaQuerySizes } from 'src/lib/styles/mixins/media';

export const CalendarDayCountdown: React.FC = () => {
  const {
    match: {
      params: { date },
    },
    history,
  } = useReactRouter<{ date: string }>();
  const isMobile = useMediaQuery({ maxWidth: mediaQuerySizes.mobile });

  const jsDate = parse(date, 'MMMM-do-yyyy', new Date());
  const stringDate = format(jsDate, 'MMMM do');

  const nextDay = addDays(jsDate, 1);
  const nextDayString = format(nextDay, 'MMMM do');
  const prevDay = subDays(jsDate, 1);
  const prevDayString = format(prevDay, 'MMMM do');

  useEffect(() => {
    document.title = `How much time left until ${stringDate}?`;
  }, [date]);

  return (
    <Container>
      <Toolbar>
        <Typography.Title level={isMobile ? 3 : 2}>{stringDate}</Typography.Title>

        <SiblingDays>
          <Button.Group size={isMobile ? 'small' : 'default'}>
            <Button
              type="primary"
              size={isMobile ? 'small' : 'default'}
              onClick={() =>
                history.push(`/calendar/${format(prevDay, 'MMMM-do-yyyy').toLowerCase()}`)
              }
            >
              <Icon type="left" />
              {prevDayString}
            </Button>
            <Button
              type="primary"
              onClick={() =>
                history.push(`/calendar/${format(nextDay, 'MMMM-do-yyyy').toLowerCase()}`)
              }
            >
              {nextDayString}
              <Icon type="right" />
            </Button>
          </Button.Group>
        </SiblingDays>
      </Toolbar>

      <Divider />

      <Content>
        <CountdownToDay key={String(jsDate)} date={jsDate} />
        <Info>
          {[
            { title: `Day of the week`, text: dayOfWeek(jsDate) },
            {
              title: `From start of the year`,
              text: `${daysFromYearStart(jsDate)} days`,
            },
            {
              title: `Until the end of the year`,
              text: `${daysUntilEndOfYear(jsDate)} days`,
            },
            {
              title: `Until next Friday`,
              text: `${daysUntilNextFriday(jsDate)} days`,
            },
          ].map(item => (
            <InfoItem key={item.text}>
              <Statistic title={item.title} value={item.text} />
            </InfoItem>
          ))}
        </Info>
        <ShareLinks
          title={`How much time left until ${stringDate}?`}
          description={`Watch online countdown until ${stringDate} on Momenter!`}
        />
      </Content>
    </Container>
  );
};
