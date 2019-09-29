import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import useReactRouter from 'use-react-router';
import { parse, format, addDays, subDays } from 'date-fns';

import { Typography } from 'src/components-basic/Typography';
import { Statistic } from 'src/components-basic/Statistic';
import { Button, ButtonGroup } from 'src/components-basic/Button';
import { Divider } from 'src/components-basic/Divider';
import { Container } from 'src/components/Layout/Container';
import { ShareLinks } from 'src/components/ShareLinks/ShareLinks';
import { mediaQuerySizes } from 'src/lib/styles/mixins/media';
import { LeftArrowIcon } from 'src/components/__icons__/LeftArrowIcon';
import { RightArrowIcon } from 'src/components/__icons__/RightArrowIcon';

import { CountdownToDay } from './CountdownToDay/CountdownToDay';

import {
  dayOfWeek,
  daysFromYearStart,
  daysUntilNextFriday,
  daysUntilEndOfYear,
} from 'src/lib/helpers/dayInfo';

import {
  Toolbar,
  Content,
  Info,
  InfoItem,
  SiblingDays,
  ToolbarTitle,
} from './CalendarDayCountdown.styled';

export const CalendarDayCountdown: React.FC = () => {
  const {
    match: {
      params: { date },
    },
  } = useReactRouter<{ date: string }>();
  const isMobile = useMediaQuery({ maxWidth: mediaQuerySizes.mobile });

  const jsDate = parse(date, 'MMMM-do-yyyy', new Date());
  const stringDate = format(jsDate, 'MMMM do');

  const nextDay = addDays(jsDate, 1);
  const nextDayString = format(nextDay, 'MMM do');
  const prevDay = subDays(jsDate, 1);
  const prevDayString = format(prevDay, 'MMM do');

  useEffect(() => {
    document.title = `How much time left until ${stringDate}?`;
  }, [date]);

  return (
    <Container>
      <Toolbar>
        <ToolbarTitle>
          <Typography.Title level={isMobile ? 3 : 2}>{stringDate}</Typography.Title>
        </ToolbarTitle>

        <SiblingDays>
          <ButtonGroup>
            <Button
              linkTo={`/calendar/${format(prevDay, 'MMMM-do-yyyy').toLowerCase()}`}
              leftIcon={<LeftArrowIcon />}
            >
              {prevDayString}
            </Button>
            <Button
              linkTo={`/calendar/${format(nextDay, 'MMMM-do-yyyy').toLowerCase()}`}
              rightIcon={<RightArrowIcon />}
            >
              {nextDayString}
            </Button>
          </ButtonGroup>
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
