export type ILoginResponse = {
  token: IToken;
  user: IUser;
};

export type IUser = {
  created_on: string;
  email: string;
  last_login: null | string;
  user_id: number;
  username: string;
};

export type IUserLogIn = {
  email: string;
  password: string;
};

export type IToken = string;
