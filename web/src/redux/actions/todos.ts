import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  changeStatus,
  changeTodoDescription,
  getTodos,
  newTodo,
  removeTodo
} from "../../services/todo.services";
import { RootState } from "../reducers";
import { ITodo } from "./../../types";
import {
  ADD_NEW_TODO,
  DELETE_TODO,
  SetDataTypes,
  SET_TODOS_DATA,
  UPDATE_TODO,
  UPDATE_TODO_STATUS
} from "./../types";

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

export const UpdateTodoStatus = (
  status: boolean,
  token: string,
  id: number
): AppThunk => async (dispatch) => {
  try {
    const response = await changeStatus(status, token, id);
    console.log(response);
    dispatch({
      type: UPDATE_TODO_STATUS,
      payload: id
    });
    // dispatch(getUsersTodos(token));
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
  todo: ITodo,
  token: string,
  id: string
): AppThunk => async (dispatch) => {
  const { description, tags } = todo;
  try {
    const response = await changeTodoDescription(description, tags, token, id);
    console.log(response);
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
    dispatch({
      type: DELETE_TODO,
      payload: id
    });
    // dispatch(getUsersTodos(token));
  } catch (error) {
    console.log(error);
  }
};
