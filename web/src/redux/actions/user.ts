import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { updateImage } from "../../services/user.services";
import { RootState } from "../reducers";
import { AuthenticateActionTypes } from "../types";
import { SET_USER_PROFILE_IMAGE } from "./../types";

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  AuthenticateActionTypes,
  Action<string>
>;

// update users image
export const updateUserProfilePicture = (
  file: File,
  token: string
): AppThunk => async (dispatch) => {
  try {
    const response = await updateImage(file, token);
    dispatch({
      type: SET_USER_PROFILE_IMAGE,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};
