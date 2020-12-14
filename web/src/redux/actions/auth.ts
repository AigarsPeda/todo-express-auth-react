import { IUserLogIn, IUserSignUp } from "./../../types";
import {
  CLEAR_DATA,
  CLEAR_USER_DATA,
  SET_USER_DATA,
  UNAUTHENTICATED_USER,
  UserActionTypes
} from "./../types";
import { AUTHENTICATE_USER, AuthenticateActionTypes } from "../types";
import { singInUser, singUpUser } from "../../services/auth.services";

import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { Action } from "redux";

// ThunkAction<any, RootState, AuthenticateActionTypes | SetErrorActionTypes, Action<string>>

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  AuthenticateActionTypes | UserActionTypes,
  Action<string>
>;

// create new user
export const signUpUser = (userData: IUserSignUp): AppThunk => async (
  dispatch
) => {
  try {
    const response = await singUpUser(userData);
    console.log("Created User: ", response);
    const { token, user } = response;
    // authToken(token);
    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
    dispatch({
      type: SET_USER_DATA,
      payload: user
    });
  } catch (error) {
    console.log(error);
  }
};

// log in existing user
export const logInUser = (userData: IUserLogIn): AppThunk => async (
  dispatch
) => {
  try {
    const response = await singInUser(userData);
    console.log("Created User: ", response);
    const { token, user } = response;
    // authToken(token);
    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
    dispatch({
      type: SET_USER_DATA,
      payload: user
    });
  } catch (error) {
    console.log(error);
  }
};

export const logOutUser = (): AppThunk => (dispatch) => {
  dispatch({
    type: CLEAR_DATA
  });
  dispatch({
    type: CLEAR_USER_DATA
  });
  dispatch({
    type: UNAUTHENTICATED_USER
  });
};
