import React, { useContext, useEffect } from 'react';
import { useTimer, TimerValue, TimerControls } from 'react-compound-timer';

import { useBigNumberOptions } from './BigNumberOptionsProvider';

export interface TimerValueContextType {
  controls: TimerControls;
  value: TimerValue;
}

export const TimerValueContext = React.createContext<TimerValueContextType | null>(null);

export function useTimerValue() {
  const context = useContext(TimerValueContext);

  if (!context) {
    throw new Error(`useTimerValue must be used within a BigNumberOptionsProvider`);
  }

  return context;
}

export const TimerValueProvider: React.FC = ({ children }) => {
  const { lastUnit, updateInterval, ts } = useBigNumberOptions();

  const timer = useTimer({
    initialTime: ts,
    lastUnit,
    direction: 'backward',
    timeToUpdate: updateInterval,
    startImmediately: false,
    checkpoints: [
      {
        time: 0,
        callback: () => timer.controls.stop(),
      },
    ],
  });

  useEffect(() => {
    timer.controls.setLastUnit(lastUnit);
  }, [lastUnit]);

  useEffect(() => {
    timer.controls.setTimeToUpdate(updateInterval);
  }, [updateInterval]);

  useEffect(() => {
    if (typeof ts === 'number') {
      timer.controls.setTime(ts);
    }
  }, [ts]);

  return <TimerValueContext.Provider value={timer}>{children}</TimerValueContext.Provider>;
};
