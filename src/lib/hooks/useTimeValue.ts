import { useContext } from 'react';
import {
  CountdownValueContext,
  CountdownValueContextType,
} from '../providers/CountdownValueProvider';
import { TimerValueContext, TimerValueContextType } from '../providers/TimerValueProvider';
import {
  StopwatchValueContext,
  StopwatchValueContextType,
} from '../providers/StopwatchValueProvider';

type TimeType = TimerValueContextType | CountdownValueContextType | StopwatchValueContextType;

export function useTimeValue(): TimeType {
  const countdownContext = useContext(CountdownValueContext);
  const timerContext = useContext(TimerValueContext);
  const stopwatchContext = useContext(StopwatchValueContext);

  const contexts = [countdownContext, timerContext, stopwatchContext].filter(Boolean);

  if (contexts.length > 1) {
    console.log(contexts);
    throw new Error("You can't use 2 or more types of times at the same time.");
  }

  if (contexts.length === 0) {
    throw new Error('You should use useTimeValue inside one of time value providers.');
  }

  return contexts[0] as TimeType;
}
