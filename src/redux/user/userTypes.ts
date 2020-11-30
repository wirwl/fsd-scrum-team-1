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
export const UPDATE_USER = '@toxin-auth/UPDATE_USER';
export const UPDATE_USER_REQUESTING = '@toxin-auth/UPDATE_USER_REQUESTING';
export const UPDATE_USER_SUCCESS = '@toxin-auth/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = '@toxin-auth/UPDATE_USER_FAIL';

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

export type IUpdateUserAction = {
  type: typeof UPDATE_USER;
  payload: Partial<Omit<IUser, 'uid' | 'sex'>>;
};

export type IUpdateUserRequestingAction = {
  type: typeof UPDATE_USER_REQUESTING;
};

export type IUpdateUserSuccessAction = {
  type: typeof UPDATE_USER_SUCCESS;
  payload: Partial<Omit<IUser, 'uid' | 'sex'>>;
};

export type IUpdateUserFailAction = {
  type: typeof UPDATE_USER_FAIL;
  payload: string;
};

export type IUserActionTypes =
  ISignInAction
  | ISignInSuccessAction
  | ISignInFailAction
  | ISignInRequestingAction
  | ISignOutAction
  | ISignOutSuccessAction
  | ISignInFirebaseSuccessAction
  | IUpdateUserAction
  | IUpdateUserFailAction
  | IUpdateUserRequestingAction
  | IUpdateUserSuccessAction;
