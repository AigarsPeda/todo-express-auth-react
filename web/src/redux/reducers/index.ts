import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import authReducer, { IAuthInitialState } from "./authReducer";
import userReducer, { IUserInitialState } from "./userReducer";

interface IDefaultState {
  auth: IAuthInitialState;
  user: IUserInitialState;
}

const persistConfig = {
  key: "root",
  storage
};

const appReducers = combineReducers({
  auth: authReducer,
  user: userReducer
});

// TO DO - WHAT IS THOSE ANY ?
const rootReducers = (state: IDefaultState | undefined, action: any) => {
  let newState = state;
  // if (action.type === LOGOUT) {
  //   newState = undefined;
  // }
  return appReducers(newState, action);
};

export default persistReducer(persistConfig, rootReducers);

export type RootState = ReturnType<typeof rootReducers>;
