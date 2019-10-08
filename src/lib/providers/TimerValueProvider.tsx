import React, { useContext, useEffect } from 'react';
import {
  useTimer,
  TimerValue,
  Checkpoint,
  Direction,
  TimerStateValues,
  Unit,
} from 'react-compound-timer';

import { useBigNumberOptions } from './BigNumberOptionsProvider';

interface TimerValueContextType {
  controls: {
    start: () => void;
    stop: () => void;
    pause: () => void;
    reset: () => void;
    resume: () => void;
    setTime: (time: number) => void;
    getTime: () => number;
    getTimerState: () => TimerStateValues;
    setDirection: (direction: Direction) => void;
    setLastUnit: (lastUnit: Unit) => void;
    setTimeToUpdate: (interval: number) => void;
    setCheckpoints: (checkpoints: Checkpoint[]) => void;
  };
  value: TimerValue;
}

const TimerValueContext = React.createContext<TimerValueContextType>({
  controls: {
    start: () => {},
    stop: () => {},
    pause: () => {},
    reset: () => {},
    resume: () => {},
    setTime: () => {},
    getTime: () => 0,
    getTimerState: () => 'INITED',
    setDirection: () => {},
    setLastUnit: () => {},
    setTimeToUpdate: () => {},
    setCheckpoints: () => {},
  },
  value: {
    d: 0,
    h: 0,
    m: 0,
    s: 0,
    ms: 0,
    state: 'INITED',
  },
});

export function useTimerValue() {
  const context = useContext(TimerValueContext);

  if (!context) {
    throw new Error(`useBigNumberOptions must be used within a BigNumberOptionsProvider`);
  }

  return context;
}

interface TimerValueProviderProps {
  autoplay?: boolean;
  direction?: Direction;
}

export const TimerValueProvider: React.FC<TimerValueProviderProps> = ({
  autoplay = false,
  direction = 'backward',
  children,
}) => {
  const { initialTime, lastUnit, updateInterval } = useBigNumberOptions();

  const timer = useTimer({
    initialTime,
    lastUnit,
    direction,
    timeToUpdate: updateInterval,
    startImmediately: false,
    checkpoints: [
      {
        time: 0,
        callback: () => {
          timer.controls.stop();

          // TODO: fix negative values in react-compound-timer hook
          setTimeout(() => {
            timer.controls.reset();
          }, 1000);
        },
      },
    ],
  });

  useEffect(() => {
    timer.controls.setTime(initialTime as number);
  }, [initialTime]);

  useEffect(() => {
    if (autoplay) {
      timer.controls.start();
    }
  }, []);

  return <TimerValueContext.Provider value={timer}>{children}</TimerValueContext.Provider>;
};
