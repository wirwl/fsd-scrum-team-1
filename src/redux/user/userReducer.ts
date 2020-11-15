import {
  IUserActionTypes,
  SIGN_IN_REQUESTING,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from 'src/redux/user/userTypes';
import type { IUser } from 'src/services/dto/User';

type IUserState = {
  user: IUser | null;
  isRequesting: boolean;
  error: string | null;
};

type IUserCredentials = {
  email: string;
  password: string;
};

const initialState = {
  user: null,
  isRequesting: false,
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
        user: action.payload,
        isRequesting: false,
        error: null,
      };
    case SIGN_IN_FAIL:
      return {
        user: null,
        isRequesting: false,
        error: action.payload,
      };
    case SIGN_OUT_SUCCESS: {
      return {
        user: null,
        isRequesting: false,
        error: null,
      };
    }
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
