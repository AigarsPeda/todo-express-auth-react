import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

import rootReducers from "./reducers/index";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// store type ???
export const persistor = persistStore(store as any);

export default store;
