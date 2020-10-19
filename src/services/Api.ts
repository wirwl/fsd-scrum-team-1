import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from '../../config/firebase.json';

class Api {
  auth: firebase.auth.Auth;

  firestore: firebase.firestore.Firestore;

  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
  }

  // TODO: implements api methods
}

export default Api;
