import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducers";
import { logOutUser } from "../../redux/actions/auth";
import { Link, matchPath, useHistory, useLocation } from "react-router-dom";

import BackIcon from "../../icons/BackIcon";
import ExitIcon from "../../icons/ExitIcon";
import SettingsIcon from "../../icons/SettingsIcon";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = (props) => {
  const { isAuthenticated, logOutUser } = props;

  const history = useHistory();
  const location = useLocation();

  const isMatch = matchPath(location.pathname, {
    path: "/",
    exact: true,
    strict: true
  });

  return (
    <nav className="nav-bar">
      {isAuthenticated ? (
        <div className="nav-bar-controls">
          <div>
            {!isMatch && (
              <button
                onClick={() => history.goBack()}
                className="nav-bar-back-button"
              >
                <BackIcon /> Back
              </button>
            )}
          </div>
          <div className="nav-bar-button">
            <Link to={`/user`}>
              <SettingsIcon />
            </Link>
            <button onClick={logOutUser}>
              <ExitIcon />
            </button>
          </div>
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
