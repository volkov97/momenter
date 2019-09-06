import {
  format,
  getDayOfYear,
  isFriday,
  addDays,
  isSaturday,
  differenceInDays,
  lastDayOfYear,
} from 'date-fns';

export function daysFromYearStart(date: Date) {
  return getDayOfYear(date);
}

export function dayOfWeek(date: Date) {
  return format(date, 'EEEE');
}

export function daysUntilNextFriday(date: Date) {
  let counter = 0;
  let innerDate = date;

  while (!isFriday(innerDate)) {
    innerDate = addDays(innerDate, 1);
    counter++;
  }

  return counter;
}

export function daysUntilNextSaturday(date: Date) {
  let counter = 1;
  let innerDate = addDays(date, 1);

  while (!isSaturday(innerDate)) {
    innerDate = addDays(innerDate, 1);
    counter++;
  }

  return counter;
}

export function daysUntilEndOfYear(date: Date) {
  return differenceInDays(lastDayOfYear(date), date);
}
