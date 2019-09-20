import * as firebase from 'firebase/app';

import 'firebase/auth';

import { firebaseConfig } from 'src/config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
