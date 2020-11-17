export type IUser = {
  uid: string;
  email: string;
  name: string;
  lastname: string;
  emailVerified: boolean;
  sex: 'man' | 'woman';
  birthday: number;
  getSpecialOffers: boolean;
};
