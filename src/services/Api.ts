import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from 'config/firebase.json';
import { IUser, IUserCredentials } from '@/redux/user/userReducer';
import type { IRoom } from 'src/services/dto/Rooms';
import type { IBooking } from 'src/services/dto/Booking';

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

type IBookedRoom = {
  uid: string;
  room: IRoom;
  dateStart: number;
  dateEnd: number;
};

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

  bookings: firebase.firestore.CollectionReference;

  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.firestore = firebase.firestore();
    this.auth = firebase.auth();

    this.rooms = this.firestore.collection('rooms');
    this.users = this.firestore.collection('users');
    this.bookings = this.firestore.collection('bookings');
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
    const { uid } = user;
    // TODO: catch errors;
    await this.users.doc(uid).set({
      ...user,
      emailVerified: false,
    });

    return {
      ...user,
      emailVerified: false,
    };
  }

  async getUser(uid: string): Promise<IUser | null> {
    const snapshot = await this.users.doc(uid).get();

    if (snapshot.exists) {
      const data = <Omit<IUser, 'uid'>> snapshot.data();

      return {
        ...data,
        uid,
      };
    }

    return null;
  }

  async booking(
    uid: string,
    roomId: string,
    dateStart: number,
    dateEnd: number,
  ): Promise<void> {
    try {
      await this.bookings.add({
        uid,
        roomId,
        dateStart,
        dateEnd,
      });
    } catch (error) {
      console.error(error);
      throw new Error('booking: db error');
    }
  }

  async getBookedRooms(uid: string): Promise<IBookedRoom[]> {
    const bookingSnapshot = await this.bookings.where('uid', '==', uid).get();

    if (bookingSnapshot.empty) {
      return [];
    }

    const bookingDocs = bookingSnapshot.docs.map(
      (doc) => doc.data() as IBooking,
    );

    const result = [];
    for (let i = 0; i < bookingDocs.length; i += 1) {
      const bookingDoc = bookingDocs[i];
      const { roomId, dateStart, dateEnd } = bookingDoc;

      // eslint-disable-next-line
      const room = await this.searchRoom(roomId);
      result.push({
        uid,
        room,
        dateStart,
        dateEnd,
      });
    }

    return result;
  }

  async updateUser(
    uid: string,
    newUserData: Partial<Omit<IUser, 'uid' | 'sex'>>,
  ): Promise<null | string> {
    try {
      await this.users.doc(uid).update(newUserData);
      return null;
    } catch (error) {
      console.error('updateUser error: ', error.message);
      return 'Ошибка сервера. Попробуйте перезагрузить страницу.';
    }
  }
}

export default Api;

export {
  getAuthError,
};

export type {
  ISearchFilters,
  IBookedRoom,
};
