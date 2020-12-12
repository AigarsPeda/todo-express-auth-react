import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import LoginPage from "./pages/loginPage/LoginPage";

import "./styles.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>I am nav bar!</nav>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
