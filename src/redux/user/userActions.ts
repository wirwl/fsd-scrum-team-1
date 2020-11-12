import {
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_IN_REQUESTING,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from 'src/redux/user/userTypes';

import type {
  IUserActionTypes,
} from 'src/redux/user/userTypes';

import type {
  IUserCredentials,
  IUser,
} from 'src/redux/user/userReducer';

export const signIn = (
  params: IUserCredentials,
): IUserActionTypes => ({
  type: SIGN_IN,
  payload: params,
});

export const signInSuccess = (
  params: IUser,
): IUserActionTypes => ({
  type: SIGN_IN_SUCCESS,
  payload: params,
});

export const signInFail = (
  error: string,
): IUserActionTypes => ({
  type: SIGN_IN_FAIL,
  payload: error,
});

export const signInRequesting = (): IUserActionTypes => ({
  type: SIGN_IN_REQUESTING,
});

export const signOut = (): IUserActionTypes => ({
  type: SIGN_OUT,
});
