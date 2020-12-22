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

export type IUserSignUp = {
  email: string;
  password: string;
  username: string;
};

export type IToken = string;

export type ITodo = {
  id: number;
  user_id: number;
  description: string;
  completed: boolean;
  created_on: string;
  tags: ITag[];
};

export type ITag = string;

export type IAPIMessage = {
  message: string;
};
