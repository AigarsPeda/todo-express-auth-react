import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducers";
import { logOutUser } from "../../redux/actions/auth";
import ExitIcon from "../../icons/ExitIcon";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = (props) => {
  const { isAuthenticated, logOutUser } = props;
  return (
    <nav className="nav-bar">
      {isAuthenticated ? (
        <div className="nav-bar-controls">
          <button onClick={logOutUser}>
            <ExitIcon />
          </button>
        </div>
      ) : null}
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { logOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
