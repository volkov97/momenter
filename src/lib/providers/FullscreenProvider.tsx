import React, { useCallback, useMemo, useContext } from 'react';
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';

const fullscreen = screenfull as Screenfull;

interface FullscreenContextType {
  isFullscreenEnabled: () => boolean;
  isInFullscreen: () => boolean;
  enterFullscreen: (el: HTMLElement) => void;
  exitFullscreen: () => void;
}

const FullscreenContext = React.createContext<FullscreenContextType>({
  isFullscreenEnabled: () => false,
  isInFullscreen: () => false,
  enterFullscreen: () => {},
  exitFullscreen: () => {},
});

export const useFullscreen = () => {
  const context = useContext(FullscreenContext);

  if (!context) {
    throw new Error(`useFullscreen must be used within a FullscreenProvider`);
  }

  return context;
};

export const FullscreenProvider: React.FC = ({ children }) => {
  const isFullscreenEnabled = useCallback(() => fullscreen.isEnabled, []);
  const isInFullscreen = useCallback(() => fullscreen.isFullscreen, []);
  const enterFullscreen = useCallback((el: HTMLElement) => fullscreen.request(el), []);
  const exitFullscreen = useCallback(() => fullscreen.exit(), []);

  const value = useMemo(
    () => ({
      isFullscreenEnabled,
      isInFullscreen,
      enterFullscreen,
      exitFullscreen,
    }),
    [],
  );

  return <FullscreenContext.Provider value={value}>{children}</FullscreenContext.Provider>;
};
