import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer, { IAuthState } from "./authReducer";
import todosReducer, { ITodosState } from "./todosReducer";
import userReducer, { IUserState } from "./userReducer";

interface IDefaultState {
  auth: IAuthState;
  user: IUserState;
  todos: ITodosState;
}

const persistConfig = {
  key: "root",
  storage
};

const appReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  todos: todosReducer
});

const rootReducers = (state: IDefaultState | undefined, action: any) => {
  const newState = state;

  return appReducers(newState, action);
};

export default persistReducer(persistConfig, rootReducers);

export type RootState = ReturnType<typeof rootReducers>;
