import { IUserLogIn } from "./../../types";
import { LOGOUT } from "./../types";
import { AUTHENTICATE_USER, AuthenticateActionTypes } from "../types";
import { singInUser } from "../../services/auth.services";

import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { Action } from "redux";

// ThunkAction<any, RootState, AuthenticateActionTypes | SetErrorActionTypes, Action<string>>

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  AuthenticateActionTypes,
  Action<string>
>;

// log in existing user
export const logInUser = (userData: IUserLogIn): AppThunk => async (
  dispatch
) => {
  try {
    const user = await singInUser(userData);
    console.log("Created User: ", user);
    const { token } = user;
    // authToken(token);
    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (): AppThunk => (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: null
  });
};
