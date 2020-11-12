type IUser = {
  name: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
};

type IUserState = {
  user: IUser | null;
  isRequesting: false;
  error: string | null;
};

type IUserCredentials = {
  email: string;
  password: string;
};

export type {
  IUser,
  IUserState,
  IUserCredentials,
};
