import admin, { ServiceAccount, auth } from 'firebase-admin';

import serviceAccountKey from 'config/fsd-toxin-firebase-adminsdk.json';
import { IUser } from 'src/services/dto/User';

const DATABASE_URL = 'https://fsd-toxin.firebaseio.com';

class FirebaseAdmin {
  db: FirebaseFirestore.Firestore;

  auth: auth.Auth;

  constructor() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
        databaseURL: DATABASE_URL,
      });
    }

    this.db = admin.firestore();
    this.auth = admin.auth();
  }

  async getUser(uid: string): Promise<IUser | null> {
    const snapshot = await this.db.collection('users').doc(uid).get();

    if (!snapshot.exists) {
      return null;
    }

    const data = <IUser> snapshot.data();

    if (data === undefined) {
      return null;
    }

    return {
      ...data,
      uid,
    };
  }
}

export default FirebaseAdmin;
