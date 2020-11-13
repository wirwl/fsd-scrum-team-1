import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from 'config/firebase.json';
import type { IRoom } from 'src/services/dto/Rooms';
import { IUser, IUserCredentials } from '@/redux/user/userReducer';

interface ISearchFilters {
  n?: number;
  roomsOnPage?: number;
  adults?: number;
  babies?: number;
  priceMin?: number;
  priceMax?: number;
  isLux?: boolean;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
  guestAllowed?: boolean;
  wideCorridor?: boolean;
  assistantForDisabled?: boolean;
  breakfast?: boolean;
  desk?: boolean;
  feedingChair?: boolean;
  smallBad?: boolean;
  tv?: boolean;
  shampoo?: boolean;
}

const CODE_PASSWORD_WRONG = 'auth/wrong-password';
const CODE_USER_NOT_FOUND = 'auth/user-not-found';

const getAuthError = (code: string): string | null => {
  switch (code) {
    case CODE_PASSWORD_WRONG:
      return 'Неверный пароль';
    case CODE_USER_NOT_FOUND:
      return 'Пользователь с таким email не был найден';
    default:
      return null;
  }
};

class Api {
  auth: firebase.auth.Auth;

  firestore: firebase.firestore.Firestore;

  rooms: firebase.firestore.CollectionReference;

  users: firebase.firestore.CollectionReference;

  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.firestore = firebase.firestore();
    this.auth = firebase.auth();

    this.rooms = this.firestore.collection('rooms');
    this.users = this.firestore.collection('users');
  }

  async searchRoom(id: string): Promise<IRoom> {
    const roomDoc = await this.rooms.doc(id).get();

    if (roomDoc.exists) return roomDoc.data() as IRoom;
    throw (new Error("Couldn't find room."));
  }

  async searchRooms(filters: ISearchFilters): Promise<IRoom[]> {
    const {
      adults = 1,
      babies = 0,
      priceMax = null,
      priceMin = null,
    } = filters;

    const snapshot = await this.createQueryForRooms(filters).get();
    if (snapshot.empty) return [];

    const rooms: IRoom[] = [];

    snapshot.forEach((item) => {
      const roomData = item.data() as IRoom;

      let isMatchesFilters = true;

      if (priceMin !== null && roomData.price < priceMin) isMatchesFilters = false;
      if (priceMax !== null && roomData.price > priceMax) isMatchesFilters = false;
      if (roomData.bed < adults) isMatchesFilters = false;
      if (roomData.childBed < babies) isMatchesFilters = false;

      if (isMatchesFilters) {
        roomData.id = item.id;
        rooms.push(roomData);
      }
    });

    return rooms;
  }

  private createQueryForRooms(
    filters: ISearchFilters,
  ): firebase.firestore.Query<firebase.firestore.DocumentData> {
    const {
      n,
      roomsOnPage = 12,
      isLux = null,
      petsAllowed = null,
      smokingAllowed = null,
      guestAllowed = null,
      wideCorridor = null,
      assistantForDisabled = null,
      breakfast = null,
      desk = null,
      feedingChair = null,
      shampoo = null,
      smallBad = null,
      tv = null,
    } = filters;

    if (roomsOnPage <= 0) throw (new Error("'roomsOnPage' must be greater than zero!"));

    let query = this.rooms.orderBy('n');

    if (assistantForDisabled !== null) {
      query = query.where('accessibility.assistantForDisabled', '==', assistantForDisabled);
    }
    if (wideCorridor !== null) {
      query = query.where('accessibility.wideCorridor', '==', wideCorridor);
    }
    if (isLux !== null) query = query.where('isLux', '==', isLux);
    if (petsAllowed !== null) query = query.where('rules.petsAllowed', '==', petsAllowed);
    if (smokingAllowed !== null) query = query.where('rules.smokingAllowed', '==', smokingAllowed);
    if (guestAllowed !== null) query = query.where('rules.guestAllowed', '==', guestAllowed);
    if (tv !== null) query = query.where('extranConvinience.tv', '==', tv);
    if (breakfast !== null) query = query.where('extranConvinience.breakfast', '==', breakfast);
    if (desk !== null) query = query.where('extranConvinience.desk', '==', desk);
    if (shampoo !== null) query = query.where('extranConvinience.shampoo', '==', shampoo);
    if (smallBad !== null) query = query.where('extranConvinience.smallBad', '==', smallBad);
    if (feedingChair !== null) {
      query = query.where('extranConvinience.feedingChair', '==', feedingChair);
    }

    if (n !== undefined) query = query.startAfter(n);

    return query.limit(roomsOnPage);
  }

  signIn({ email, password }: IUserCredentials): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async createUser(user: Omit<IUser, 'emailVerified'>): Promise<IUser> {
    const { email } = user;
    await this.users.doc(email).set({
      ...user,
      emailVerified: false,
    });

    return {
      ...user,
      emailVerified: false,
    };
  }

  async getUser(email: string): Promise<IUser | null> {
    const snapshot = await this.users.doc(email).get();

    if (snapshot.exists) {
      const data = <Omit<IUser, 'email'>> snapshot.data();

      return {
        ...data,
        email,
      };
    }

    return null;
  }
}

export default Api;

export {
  getAuthError,
};

export type { ISearchFilters };
