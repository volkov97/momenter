import React, { useContext, useEffect } from 'react';
import { useTimer, TimerValue, TimerControls } from 'react-compound-timer';

import { useBigNumberOptions } from './BigNumberOptionsProvider';

export interface CountdownValueContextType {
  controls: TimerControls;
  value: TimerValue;
}

export const CountdownValueContext = React.createContext<CountdownValueContextType | null>(null);

export function useCountdownValue() {
  const context = useContext(CountdownValueContext);

  if (!context) {
    throw new Error(`useCountdownValue must be used within a BigNumberOptionsProvider`);
  }

  return context;
}

export const CountdownValueProvider: React.FC = ({ children }) => {
  const { lastUnit, updateInterval, ts } = useBigNumberOptions();

  const timer = useTimer({
    initialTime: ts - Date.now(),
    lastUnit,
    direction: 'backward',
    timeToUpdate: updateInterval,
    startImmediately: false,
  });

  useEffect(() => {
    timer.controls.setLastUnit(lastUnit);
  }, [lastUnit]);

  useEffect(() => {
    timer.controls.setTimeToUpdate(updateInterval);
  }, [updateInterval]);

  useEffect(() => {
    if (ts) {
      timer.controls.setTime(ts - Date.now());
    }
  }, [ts]);

  useEffect(() => {
    timer.controls.start();
  }, []);

  return <CountdownValueContext.Provider value={timer}>{children}</CountdownValueContext.Provider>;
};
