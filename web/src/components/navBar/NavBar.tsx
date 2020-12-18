import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ExitIcon from "../../icons/ExitIcon";
import { logOutUser } from "../../redux/actions/auth";
import { RootState } from "../../redux/reducers";

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
      ) : (
        <ul className="links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { logOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
