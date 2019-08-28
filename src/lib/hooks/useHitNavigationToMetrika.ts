import { useEffect, useRef } from 'react';
import ym from 'react-yandex-metrika';
import useReactRouter from 'use-react-router';

export function useHitNavigationToMetrika() {
  const {
    location: { pathname },
  } = useReactRouter();

  const isFirstNavigation = useRef(true);

  useEffect(() => {
    if (isFirstNavigation.current) {
      isFirstNavigation.current = false;

      return;
    }

    ym('hit', pathname);
  }, [pathname]);
}
