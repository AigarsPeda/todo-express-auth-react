import { IUserLogIn, IUserSignUp } from "./../../types";
import { SET_USER_PROFILE_IMAGE, SetUserTypes } from "./../types";
import { AUTHENTICATE_USER, AuthenticateActionTypes } from "../types";

import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { Action } from "redux";
import { updateImage } from "../../services/user.services";
// import { getUsersTodos } from "./todos";

// ThunkAction<any, RootState, AuthenticateActionTypes | SetErrorActionTypes, Action<string>>

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  AuthenticateActionTypes,
  Action<string>
>;

// create new user
export const updateUserProfilePicture = (
  file: File,
  token: string
): AppThunk => async (_dispatch) => {
  try {
    console.log("ei");
    const response = await updateImage(file, token);
    console.log("RESPONSE: ", response);

    // const { token, user } = response;
    // authToken(token);
    // dispatch({
    //   type: AUTHENTICATE_USER,
    //   payload: token
    // });
  } catch (error) {
    console.log(error);
  }
};
