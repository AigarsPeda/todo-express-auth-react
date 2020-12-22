import { SET_TODOS_DATA, SetDataTypes } from "./../types";

import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { Action } from "redux";
import {
  changeStatus,
  getTodos,
  newTodo,
  removeTodo
} from "../../services/todo.services";

// ThunkAction<any, RootState, AuthenticateActionTypes | SetErrorActionTypes, Action<string>>

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  SetDataTypes,
  Action<string>
>;

// create new user
export const getUsersTodos = (token: string): AppThunk => async (dispatch) => {
  try {
    const response = await getTodos(token);
    // console.log(getUsersTodos, response);
    // authToken(token);
    dispatch({
      type: SET_TODOS_DATA,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};

export const upDateTodoStatus = (
  status: boolean,
  token: string,
  todosId: number
): AppThunk => async (dispatch) => {
  try {
    await changeStatus(status, token, todosId);
    dispatch(getUsersTodos(token));
  } catch (error) {
    console.log(error);
  }
};

export const addNewTodo = (
  description: string,
  tags: string[],
  token: string
): AppThunk => async (dispatch) => {
  try {
    const res = await newTodo(description, tags, token);
    console.log("RES: ", res);
    dispatch(getUsersTodos(token));
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = (id: number, token: string): AppThunk => async (
  dispatch
) => {
  try {
    await removeTodo(id, token);
    dispatch(getUsersTodos(token));
  } catch (error) {
    console.log(error);
  }
};
