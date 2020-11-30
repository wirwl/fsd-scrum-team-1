import type { User as FirebaseUser } from 'firebase';

import {
  ISignInAction,
  ISignInFailAction,
  ISignInRequestingAction,
  ISignInFirebaseSuccessAction,
  ISignInSuccessAction,
  ISignOutAction,
  ISignOutSuccessAction,
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_IN_REQUESTING,
  SIGN_IN_FIREBASE_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUESTING,
  IUpdateUserRequestingAction,
  IUpdateUserSuccessAction,
  IUpdateUserFailAction,
  IUpdateUserAction,
} from 'src/redux/user/userTypes';

import type {
  IUserCredentials,
  IUser,
} from 'src/redux/user/userReducer';

export const signIn = (
  params: IUserCredentials,
): ISignInAction => ({
  type: SIGN_IN,
  payload: params,
});

export const signInFirebaseSuccess = (
  params: FirebaseUser,
): ISignInFirebaseSuccessAction => ({
  type: SIGN_IN_FIREBASE_SUCCESS,
  payload: params,
});

export const signInSuccess = (
  params: IUser,
): ISignInSuccessAction => ({
  type: SIGN_IN_SUCCESS,
  payload: params,
});

export const signInFail = (
  error: string,
): ISignInFailAction => ({
  type: SIGN_IN_FAIL,
  payload: error,
});

export const signInRequesting = (): ISignInRequestingAction => ({
  type: SIGN_IN_REQUESTING,
});

export const signOut = (): ISignOutAction => ({
  type: SIGN_OUT,
});

export const signOutSuccess = (): ISignOutSuccessAction => ({
  type: SIGN_OUT_SUCCESS,
});

export const updateUser = (newUserData: Partial<Omit<IUser, 'uid' | 'sex'>>): IUpdateUserAction => ({
  type: UPDATE_USER,
  payload: newUserData,
});

export const updateUserRequesting = (): IUpdateUserRequestingAction => ({
  type: UPDATE_USER_REQUESTING,
});

export const updateUserSuccess = (newUserData: Partial<Omit<IUser, 'uid' | 'sex'>>): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: newUserData,
});

export const updateUserFail = (error: string): IUpdateUserFailAction => ({
  type: UPDATE_USER_FAIL,
  payload: error,
});
