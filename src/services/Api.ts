import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as admin from 'firebase-admin';

import firebaseConfig from '../../config/firebase.json';

const isClientAndNotInit = (
  apps: firebase.app.App[],
): boolean => process.browser && apps.length === 0;

class Api {
  auth: firebase.auth.Auth | admin.auth.Auth;

  firestore: firebase.firestore.Firestore | admin.firestore.Firestore;

  constructor() {
    if (isClientAndNotInit(firebase.apps)) {
      firebase.initializeApp(firebaseConfig);
    }

    if (process.browser) {
      this.firestore = firebase.firestore();
      this.auth = firebase.auth();
      // this.auth.signInWithEmailAndPassword('mglkn@yandex.ru', '123456');
      return;
    }

    // server only
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(
          require('../../config/fsd-toxin-firebase-adminsdk-dafjv-bfab20e08e.json'), // eslint-disable-line
        ),
        databaseURL: 'https://fsd-toxin.firebaseio.com',
      });
    }

    this.firestore = admin.firestore();
    this.auth = admin.auth();
  }

  // TODO: implements api methods
}

export default Api;
