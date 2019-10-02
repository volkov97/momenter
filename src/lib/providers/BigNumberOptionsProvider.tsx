import React, { useReducer, useContext, useMemo, useCallback, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Unit } from 'react-compound-timer';
import queryString from 'query-string';
import { fonts } from 'src/config/fonts';

export type FontSize = 1 | 2 | 3 | 4 | 5;

interface BigNumberOptionsType {
  lastUnit: Unit;
  fontSize: FontSize;
  fontColor: string;
  fontFamily: string;
  backgroundColor: string;
  showMs: boolean;
  updateInterval: number;
}

const initialBigNumberOptionsState: BigNumberOptionsType = {
  lastUnit: 'h',
  fontFamily: fonts.trebuchet,
  fontSize: 3,
  fontColor: '#000',
  backgroundColor: '#fff',
  showMs: false,
  updateInterval: 1000,
};

interface BigNumberOptionsContextType extends BigNumberOptionsType {
  changeLastUnit: (unit: Unit) => void;
  changeFontFamily: (family: string) => void;
  changeFontSize: (size: FontSize) => void;
  changeFontColor: (color: string) => void;
  changeBackgroundColor: (color: string) => void;
  changeMsVisibility: (value: boolean) => void;
  changeUpdateInterval: (value: number) => void;
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
  | { type: 'changeUpdateInterval'; value: number };

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
    default:
      console.warn('Unknown action type for bigNumberOptionsReducer');
      return state;
  }
}

export const BigNumberOptionsProvider: React.FC = ({ children }) => {
  const { history } = useReactRouter();
  const optionsFromUrl: { options?: string } = queryString.parse(location.search);

  const [state, dispatch] = useReducer(
    bigNumberOptionsReducer,
    optionsFromUrl.options
      ? JSON.parse(decodeURI(optionsFromUrl.options))
      : initialBigNumberOptionsState,
  );

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