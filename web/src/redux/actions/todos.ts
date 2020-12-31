import {
  SET_TODOS_DATA,
  SetDataTypes,
  UPDATE_TODO,
  ADD_NEW_TODO
} from "./../types";

import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { Action } from "redux";
import {
  changeStatus,
  changeTodoDescription,
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
    const response = await newTodo(description, tags, token);
    // console.log("RES: ", response);

    dispatch({
      type: ADD_NEW_TODO,
      payload: response
    });

    // dispatch(getUsersTodos(token));
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = (
  description: string,
  token: string,
  id: string
): AppThunk => async (dispatch) => {
  try {
    const response = await changeTodoDescription(description, token, id);

    dispatch({
      type: UPDATE_TODO,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = (id: number, token: string): AppThunk => async (
  dispatch
) => {
  try {
    const response = await removeTodo(id, token);
    console.log(response);
    dispatch(getUsersTodos(token));
  } catch (error) {
    console.log(error);
  }
};
