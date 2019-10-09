import React, { useReducer, useContext, useMemo, useCallback, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Unit } from 'react-compound-timer';
import queryString from 'query-string';
import { fonts } from 'src/config/fonts';

export type FontSize = 1 | 2 | 3 | 4 | 5;

interface BigNumberOptionsType {
  ts: number;
  lastUnit: Unit;
  fontSize: FontSize;
  fontColor: string;
  fontFamily: string;
  backgroundColor: string;
  showMs: boolean;
  updateInterval: number;
}

const initialBigNumberOptionsState: BigNumberOptionsType = {
  ts: 0,
  lastUnit: 'h',
  fontFamily: fonts.trebuchet,
  fontSize: 3,
  fontColor: '#000',
  backgroundColor: '#fff',
  showMs: false,
  updateInterval: 100,
};

interface BigNumberOptionsContextType extends BigNumberOptionsType {
  changeLastUnit: (unit: Unit) => void;
  changeFontFamily: (family: string) => void;
  changeFontSize: (size: FontSize) => void;
  changeFontColor: (color: string) => void;
  changeBackgroundColor: (color: string) => void;
  changeMsVisibility: (value: boolean) => void;
  changeUpdateInterval: (value: number) => void;
  changeTs: (ts: number) => void;
}

const BigNumberOptionsContext = React.createContext<BigNumberOptionsContextType>({
  ...initialBigNumberOptionsState,
  changeLastUnit: () => {},
  changeFontFamily: () => {},
  changeFontSize: () => {},
  changeFontColor: () => {},
  changeBackgroundColor: () => {},
  changeMsVisibility: () => {},
  changeUpdateInterval: () => {},
  changeTs: () => {},
});

export function useBigNumberOptions() {
  const context = useContext(BigNumberOptionsContext);

  if (!context) {
    throw new Error(`useBigNumberOptions must be used within a BigNumberOptionsProvider`);
  }

  return context;
}

type Action =
  | { type: 'init'; value: BigNumberOptionsType }
  | { type: 'changeLastUnit'; unit: Unit }
  | { type: 'changeFontFamily'; family: string }
  | { type: 'changeFontSize'; size: FontSize }
  | { type: 'changeFontColor'; color: string }
  | { type: 'changeBackgroundColor'; color: string }
  | { type: 'changeMsVisibility'; value: boolean }
  | { type: 'changeUpdateInterval'; value: number }
  | { type: 'changeTs'; value: number };

function bigNumberOptionsReducer(
  state: BigNumberOptionsType,
  action: Action,
): BigNumberOptionsType {
  switch (action.type) {
    case 'init':
      return action.value;
    case 'changeLastUnit':
      return {
        ...state,
        lastUnit: action.unit,
      };
    case 'changeFontFamily':
      return {
        ...state,
        fontFamily: action.family,
      };
    case 'changeFontSize':
      return {
        ...state,
        fontSize: action.size,
      };
    case 'changeFontColor':
      return {
        ...state,
        fontColor: action.color,
      };
    case 'changeBackgroundColor':
      return {
        ...state,
        backgroundColor: action.color,
      };
    case 'changeMsVisibility':
      return {
        ...state,
        showMs: action.value,
      };
    case 'changeUpdateInterval':
      return {
        ...state,
        updateInterval: action.value,
      };
    case 'changeTs':
      return {
        ...state,
        ts: action.value,
      };
    default:
      console.warn('Unknown action type for bigNumberOptionsReducer');
      return state;
  }
}

export const BigNumberOptionsProvider: React.FC = ({ children }) => {
  const { history, location } = useReactRouter();
  const urlParams: { ts?: string; options?: string } = queryString.parse(location.search);
  const { options: optionsJSONString, ts } = urlParams;
  const parsedOptionsFromUrl = optionsJSONString ? JSON.parse(decodeURI(optionsJSONString)) : {};

  const [state, dispatch] = useReducer(bigNumberOptionsReducer, {
    ...initialBigNumberOptionsState,
    ...(ts ? { ts: parseInt(ts) } : {}), // from url param directly
    ...parsedOptionsFromUrl,
  });

  const changeLastUnit = useCallback(
    (unit: Unit) => dispatch({ type: 'changeLastUnit', unit }),
    [],
  );

  const changeFontFamily = useCallback(
    (family: string) => dispatch({ type: 'changeFontFamily', family }),
    [],
  );

  const changeFontSize = useCallback(
    (size: FontSize) => dispatch({ type: 'changeFontSize', size }),
    [],
  );

  const changeFontColor = useCallback(
    (color: string) => dispatch({ type: 'changeFontColor', color }),
    [],
  );

  const changeBackgroundColor = useCallback(
    (color: string) => dispatch({ type: 'changeBackgroundColor', color }),
    [],
  );

  const changeMsVisibility = useCallback(
    (value: boolean) => dispatch({ type: 'changeMsVisibility', value }),
    [],
  );

  const changeUpdateInterval = useCallback(
    (value: number) => dispatch({ type: 'changeUpdateInterval', value }),
    [],
  );

  const changeTs = useCallback((value: number) => dispatch({ type: 'changeTs', value }), []);

  useEffect(() => {
    history.push(
      `${location.pathname}?${queryString.stringify({
        ...queryString.parse(location.search),
        options: encodeURI(JSON.stringify(state)),
      })}`,
    );
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      changeTs,
      changeLastUnit,
      changeFontFamily,
      changeFontSize,
      changeFontColor,
      changeBackgroundColor,
      changeMsVisibility,
      changeUpdateInterval,
    }),
    [state],
  );

  return (
    <BigNumberOptionsContext.Provider value={value}>{children}</BigNumberOptionsContext.Provider>
  );
};
