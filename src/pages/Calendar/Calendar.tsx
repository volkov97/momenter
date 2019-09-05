import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  format,
  startOfDay,
  addDays,
  differenceInDays,
  startOfWeek,
  isToday,
  startOfMonth,
  endOfMonth,
  addMonths,
} from 'date-fns';

import {
  Wrap,
  Month,
  MonthHeader,
  Days,
  DaySquare,
  DaySquareContent,
  DayDate,
  DayLink,
  Badges,
  Badge,
} from './Calendar.styled';

function createMonth(date: Date) {
  const startDay = startOfMonth(date);
  const endDay = endOfMonth(date);
  const startOfWeekOfStartDay = startOfWeek(startDay, { weekStartsOn: 1 });

  return {
    title: format(startDay, 'MMMM yyyy'),
    daysCount: differenceInDays(endDay, startDay) + 1,
    startDay,
    endDay,
    daysFromWeekStart: differenceInDays(startDay, startOfWeekOfStartDay),
  };
}

function create12Months(currentDate: Date) {
  return Array.from({ length: 12 }, (_, index) => createMonth(addMonths(currentDate, index)));
}

export const Calendar: React.FC = () => {
  const currentDate = startOfDay(new Date());

  const months = useMemo(() => create12Months(currentDate), []);

  return (
    <Wrap>
      {months.map(month => {
        return (
          <Month key={month.startDay.toString()}>
            <MonthHeader>
              <Typography variant="h4" component="h2">
                {month.title}
              </Typography>
            </MonthHeader>
            <Days>
              {new Array(month.daysFromWeekStart).fill(null).map((_, index) => (
                <DaySquare key={index} isEmpty={index !== month.daysFromWeekStart - 1} />
              ))}
              {new Array(month.daysCount).fill(null).map((_, index) => {
                const todayDay = addDays(month.startDay, index);

                return (
                  <DaySquare key={index}>
                    <DaySquareContent>
                      <DayDate>{format(todayDay, 'do')}</DayDate>
                      <Badges>{isToday(todayDay) && <Badge color="red">Today</Badge>}</Badges>
                      <DayLink to={`/calendar/${format(todayDay, 'MMMM-do-yyyy').toLowerCase()}`} />
                    </DaySquareContent>
                  </DaySquare>
                );
              })}
            </Days>
          </Month>
        );
      })}
    </Wrap>
  );
};
