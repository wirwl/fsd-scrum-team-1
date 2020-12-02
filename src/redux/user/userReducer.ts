import {
  IUserActionTypes,
  SIGN_IN_REQUESTING,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  UPDATE_USER_REQUESTING,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from 'src/redux/user/userTypes';
import type { IUser } from 'src/services/dto/User';

type IUserState = {
  user: IUser | null;
  isRequesting: boolean;
  error: string | null;
  isRegistration: boolean;
};

type IUserCredentials = {
  email: string;
  password: string;
};

const initialState = {
  user: null,
  isRequesting: false,
  isRegistration: false,
  error: null,
};

export const userReducer = (
  state: IUserState = initialState,
  action: IUserActionTypes,
): IUserState => {
  switch (action.type) {
    case SIGN_IN_REQUESTING:
      return {
        ...state,
        isRequesting: true,
        error: null,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isRequesting: false,
        error: null,
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        user: null,
        isRequesting: false,
        error: action.payload,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        isRequesting: false,
        error: null,
      };
    case REGISTRATION:
      return {
        user: null,
        isRequesting: false,
        error: null,
        isRegistration: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        user: action.payload,
        isRequesting: false,
        error: null,
        isRegistration: false,
      };
    case REGISTRATION_FAIL:
      return {
        user: null,
        isRequesting: false,
        error: action.payload,
        isRegistration: false,
      };
    case UPDATE_USER_REQUESTING:
      return {
        ...state,
        isRequesting: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        user: <IUser> { ...state.user, ...action.payload },
        error: null,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isRequesting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

export type {
  IUser,
  IUserState,
  IUserCredentials,
};
