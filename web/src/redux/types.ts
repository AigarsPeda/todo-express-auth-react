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

// AUTH
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

export const ADD_NEW_TODO = "ADD_NEW_TODO";
interface IAddNewTodoAction {
  type: typeof ADD_NEW_TODO;
  payload: ITodo;
}

export const DELETE_TODO = "DELETE_TODO";
interface IDeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: number;
}

export const UPDATE_TODO = "UPDATE_TODO";
interface IUpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: ITodo;
}

export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";
interface IUpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS;
  payload: number;
}

export const CLEAR_DATA = "CLEAR_DATA";
interface IClearDataAction {
  type: typeof CLEAR_DATA;
  // payload: ScreamType[];
}

export type SetDataTypes =
  | IClearDataAction
  | ITodosDataAction
  | IAddNewTodoAction
  | IDeleteTodoAction
  | IUpdateTodoAction
  | IUpdateTodoStatusAction;

// USER
export const SET_USER_PROFILE_IMAGE = "SET_USER_PROFILE_IMAGE";
interface ISetUserProfileImageAction {
  type: typeof SET_USER_PROFILE_IMAGE;
  payload: string;
}

export type SetUserTypes = ISetUserProfileImageAction;
