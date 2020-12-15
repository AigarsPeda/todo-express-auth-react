import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { RootState } from "../redux/reducers";
import { connect } from "react-redux";

// utils
import AuthRoute from "../utils/AuthRoute";

// pages
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import LoginPage from "../pages/loginPage/LoginPage";
import SignupPage from "../pages/signupPage/SignupPage";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const AppRoutes: React.FC<Props> = (props) => {
  const { token } = props;

  // useEffect(() => {
  //   // checking if token is valid and if it is setting in to axios header
  //   if (token) {
  //     console.log("TOKEN: ", token);
  //   }
  // }, [token]);

  return (
    <Switch>
      <AuthRoute exact path="/" component={DashboardPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
    </Switch>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
