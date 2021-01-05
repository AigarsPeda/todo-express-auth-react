import React from "react";
import { Route, Switch } from "react-router-dom";
import { RootState } from "../redux/reducers";
import { connect } from "react-redux";

// utils
import AuthRoute from "../utils/AuthRoute";

// pages
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import LoginPage from "../pages/loginPage/LoginPage";
import SignupPage from "../pages/signupPage/SignupPage";
import EditTodoPage from "../pages/editTodoPage/EditTodoPage";
import UserProfilePage from "../pages/userProfilePage/UserProfilePage";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const AppRoutes: React.FC<Props> = () => {
  // const { token } = props;

  // useEffect(() => {
  //   // checking if token is valid and if it is setting in to axios header
  //   if (token) {
  //     console.log("TOKEN: ", token);
  //   }
  // }, [token]);

  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <AuthRoute exact path="/" component={DashboardPage} />
      <AuthRoute exact path="/user" component={UserProfilePage} />
      <AuthRoute exact path="/todo/:id" component={EditTodoPage} />
    </Switch>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
