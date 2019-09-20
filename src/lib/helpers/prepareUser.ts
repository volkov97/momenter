import { User } from '../types';

export function prepareUser(user: firebase.User): User {
  return {
    id: user.uid,
    email: user.email || '',
    name: user.displayName || '',
    avatarUrl: user.photoURL || '',
  };
}
