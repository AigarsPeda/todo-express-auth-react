import { SET_TODOS_DATA, SetDataTypes } from "./../types";

import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { Action } from "redux";
import { getTodos } from "../../services/todo.services";

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
    console.log("Created User: ", response);

    // authToken(token);
    dispatch({
      type: SET_TODOS_DATA,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};
