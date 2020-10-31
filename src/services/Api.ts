import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from 'config/firebase.json';
import type { IRoom } from 'src/services/dto/Rooms';

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

  // for example
  async fetchRoom(): Promise<IRoom[] | null> {
    const doc = await this.rooms.doc('0criuLmN4lA853vCHRb2').get();
    const room: IRoom | undefined = doc?.data() as IRoom;

    return [room];
  }
}

export default Api;
