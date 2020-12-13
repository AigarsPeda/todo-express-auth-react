import React from "react";
import { connect } from "react-redux";
import { logOutUser } from "../../redux/actions/auth";
import { RootState } from "../../redux/reducers";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = (props) => {
  const { isAuthenticated, user, logOutUser } = props;
  return (
    <div>
      <h1>{user.username}</h1>
      <button onClick={logOutUser}>Log Out!</button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user
});

const mapDispatchToProps = { logOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
