import { IUser } from "./../../types";
import {
  CLEAR_USER_DATA,
  SET_USER_DATA,
  SET_USER_PROFILE_IMAGE,
  UserActionTypes,
  SetUserTypes
} from "../types";

export interface IUserState {
  user: IUser;
}

// Initial State
const initialState: IUserState = {
  user: {
    created_on: "",
    email: "",
    last_login: null,
    user_id: 0,
    username: "",
    user_image_url: ""
  }
};

export default (
  state = initialState,
  action: UserActionTypes | SetUserTypes
): IUserState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload
      };

    case SET_USER_PROFILE_IMAGE:
      return {
        ...state,
        user: {
          ...state.user,
          user_image_url: action.payload
        }
      };

    case CLEAR_USER_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};
