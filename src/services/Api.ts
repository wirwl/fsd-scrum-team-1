import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from '../../config/firebase.json';

class Api {
  auth: firebase.auth.Auth;

  firestore: firebase.firestore.Firestore;

  rooms: firebase.firestore.CollectionReference;

  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.firestore = firebase.firestore();
    this.auth = firebase.auth();

    this.rooms = this.firestore.collection('rooms');
  }

  // TODO: implements api methods
}

export default Api;
