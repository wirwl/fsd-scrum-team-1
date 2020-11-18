import type { User as FirebaseUser } from 'firebase';
import type {
  IUserCredentials,
  IUser,
} from 'src/redux/user/userReducer';

export const SIGN_IN = '@toxin-auth/SIGN_IN';
export const SIGN_IN_FIREBASE_SUCCESS = '@toxin-auth/SIGN_IN_FIREBASE_SUCCESS';
export const SIGN_IN_SUCCESS = '@toxin-auth/SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = '@toxin-auth/SIGN_IN_FAIL';
export const SIGN_IN_REQUESTING = '@toxin-auth/SIGN_IN_REQUESTING';

export const SIGN_OUT = '@toxin-auth/SIGN_OUT';
export const SIGN_OUT_SUCCESS = '@toxin-auth/SIGN_OUT_SUCCESS';

export type ISignInAction = {
  type: typeof SIGN_IN;
  payload: IUserCredentials;
};

export type ISignInFirebaseSuccessAction = {
  type: typeof SIGN_IN_FIREBASE_SUCCESS;
  payload: FirebaseUser;
};

export type ISignInSuccessAction = {
  type: typeof SIGN_IN_SUCCESS;
  payload: IUser;
};

export type ISignInFailAction = {
  type: typeof SIGN_IN_FAIL;
  payload: string;
};

export type ISignInRequestingAction = {
  type: typeof SIGN_IN_REQUESTING;
};

export type ISignOutAction = {
  type: typeof SIGN_OUT;
};

export type ISignOutSuccessAction = {
  type: typeof SIGN_OUT_SUCCESS;
};

export type IUserActionTypes =
  ISignInAction
  | ISignInSuccessAction
  | ISignInFailAction
  | ISignInRequestingAction
  | ISignOutAction
  | ISignOutSuccessAction
  | ISignInFirebaseSuccessAction;