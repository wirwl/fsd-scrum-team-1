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
  REGISTRATION,
  RegistrationAction,
  RegistrationSuccessAction,
  REGISTRATION_SUCCESS,
  RegistrationFailAction,
  REGISTRATION_FAIL,
} from 'src/redux/user/userTypes';

import type {
  IUserCredentials,
  IUser,
} from 'src/redux/user/userReducer';
import { IUserInfo } from '@/components/RegistrationForm/RegistrationForm';

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

export const registration = (info: IUserInfo): RegistrationAction => ({
  type: REGISTRATION,
  payload: info,
});

export const registrationSuccess = (user: IUser): RegistrationSuccessAction => ({
  type: REGISTRATION_SUCCESS,
  payload: user,
});

export const registrationFail = (error: string): RegistrationFailAction => ({
  type: REGISTRATION_FAIL,
  payload: error,
});
