import React, { useMemo, useContext, useEffect, useReducer, useCallback } from 'react';

import { User } from '../types';
import { firebaseAuth, googleAuthProvider } from '../helpers/firebase';
import { prepareUser } from '../helpers/prepareUser';

interface UserState {
  isInitializing: boolean;
  user: User | null;
}

interface CurrentUserContextType extends UserState {
  logIn: () => void;
  logOut: () => void;
}

const initialCurrentUserState: CurrentUserContextType = {
  isInitializing: true,
  logIn: () => {},
  logOut: () => {},
  user: null,
};

const CurrentUserContext = React.createContext<CurrentUserContextType>(initialCurrentUserState);

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error(`useCurrentUser must be used within a CurrentUserProvider`);
  }

  return context;
}

type Action =
  | { type: 'inited'; user: User | null }
  | { type: 'logIn'; user: User }
  | { type: 'logOut' };

function currentUserReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case 'inited':
      return {
        ...state,
        isInitializing: false,
        user: action.user,
      };
    case 'logIn':
      return {
        ...state,
        user: action.user,
      };
    case 'logOut':
      return {
        ...state,
        user: null,
      };
    default:
      console.warn('Unknown action type for currentUserReducer');
      return state;
  }
}

export const CurrentUserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(currentUserReducer, initialCurrentUserState);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(firebaseUser => {
      dispatch({ type: 'inited', user: firebaseUser ? prepareUser(firebaseUser) : null });
    });
  }, []);

  const logIn = useCallback(async () => {
    let result: firebase.auth.UserCredential;

    try {
      result = await firebaseAuth.signInWithPopup(googleAuthProvider);

      dispatch({ type: 'logIn', user: prepareUser(result.user as firebase.User) });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await firebaseAuth.signOut();

      dispatch({ type: 'logOut' });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      logIn,
      logOut,
    }),
    [state],
  );

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};
