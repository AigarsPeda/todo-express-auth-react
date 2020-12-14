import { ITodo, IUser } from "./../types";
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
interface IAuthenticateUserAction {
  type: typeof AUTHENTICATE_USER;
  payload: string;
}

export const UNAUTHENTICATED_USER = "UNAUTHENTICATED_USER";
interface IUnauthenticatedUserAction {
  type: typeof UNAUTHENTICATED_USER;
  // payload: string;
}

export type AuthenticateActionTypes =
  | IAuthenticateUserAction
  | IUnauthenticatedUserAction;

// USER
export const SET_USER_DATA = "SET_USER_DATA";
interface ISetUserAction {
  type: typeof SET_USER_DATA;
  payload: IUser;
}

export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
interface IClearUserDataAction {
  type: typeof CLEAR_USER_DATA;
  // payload: ScreamType[];
}

export type UserActionTypes = ISetUserAction | IClearUserDataAction;

// TODO
export const SET_TODOS_DATA = "SET_TODOS_DATA";
interface ITodosDataAction {
  type: typeof SET_TODOS_DATA;
  payload: ITodo[];
}

export const CLEAR_DATA = "CLEAR_DATA";
interface IClearDataAction {
  type: typeof CLEAR_DATA;
  // payload: ScreamType[];
}

export type SetDataTypes = IClearDataAction | ITodosDataAction;
