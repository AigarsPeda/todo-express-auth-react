import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import AppRoutes from "./routes/AppRoutes";

import "./styles.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="App">
            <nav>I am nav bar!</nav>
            <AppRoutes />
          </div>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
