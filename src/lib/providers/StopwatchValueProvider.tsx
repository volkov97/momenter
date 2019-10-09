import React, { useContext, useEffect } from 'react';
import { useTimer, TimerValue, TimerControls } from 'react-compound-timer';

import { useBigNumberOptions } from './BigNumberOptionsProvider';

export interface StopwatchValueContextType {
  controls: TimerControls;
  value: TimerValue;
}

export const StopwatchValueContext = React.createContext<StopwatchValueContextType | null>(null);

export function useStopwatchValue() {
  const context = useContext(StopwatchValueContext);

  if (!context) {
    throw new Error(`useStopwatchValue must be used within a BigNumberOptionsProvider`);
  }

  return context;
}

export const StopwatchValueProvider: React.FC = ({ children }) => {
  const { lastUnit, updateInterval } = useBigNumberOptions();

  const timer = useTimer({
    initialTime: 0,
    lastUnit,
    direction: 'forward',
    timeToUpdate: updateInterval,
    startImmediately: false,
  });

  useEffect(() => {
    timer.controls.setLastUnit(lastUnit);
  }, [lastUnit]);

  useEffect(() => {
    timer.controls.setTimeToUpdate(updateInterval);
  }, [updateInterval]);

  return <StopwatchValueContext.Provider value={timer}>{children}</StopwatchValueContext.Provider>;
};
