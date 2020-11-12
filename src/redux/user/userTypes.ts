import type {
  IUserCredentials,
  IUser,
} from 'src/redux/user/userReducer';

export const SIGN_IN = '@toxin/SIGN_IN';
export const SIGN_IN_SUCCESS = '@toxin/SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = '@toxin/SIGN_IN_FAIL';
export const SIGN_IN_REQUESTING = '@toxin/SIGN_IN_REQIESTING';
export const SIGN_OUT = '@toxin/SIGN_OUT';

export type ISignInAction = {
  type: typeof SIGN_IN;
  payload: IUserCredentials;
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

export type IUserActionTypes =
  ISignInAction
  | ISignInSuccessAction
  | ISignInFailAction
  | ISignInRequestingAction
  | ISignOutAction;
