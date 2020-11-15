export type IUser = {
  name: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  sex: 'man' | 'woman';
  birthday: number;
  getSpecialOffers: boolean;
};
