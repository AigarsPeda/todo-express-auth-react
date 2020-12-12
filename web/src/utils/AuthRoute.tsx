import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "../redux/reducers";

type propsFromRoute = {
  // TODO: fix any error comes from AppRoutes.tsx <AuthRoute exact path="/users/:handle" component={User} />
  component: React.FC | any;
  path: string;
  exact: boolean;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  propsFromRoute;

const AuthRoute: React.FC<Props> = (props) => {
  const { isAuthenticated, component, path, exact } = props;

  return !isAuthenticated ? (
    <Redirect to="/login" />
  ) : (
    <Route path={path} exact={exact} component={component} />
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
