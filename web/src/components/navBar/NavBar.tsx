import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducers";
import { logOutUser } from "../../redux/actions/auth";
import { matchPath, useHistory, useLocation } from "react-router-dom";

import BackIcon from "../../icons/BackIcon";
import ExitIcon from "../../icons/ExitIcon";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = (props) => {
  const { isAuthenticated, logOutUser } = props;

  const history = useHistory();
  const location = useLocation();

  const isMatch = matchPath(location.pathname, {
    path: "/todo/:id",
    exact: true,
    strict: true
  });

  return (
    <nav className="nav-bar">
      {isAuthenticated ? (
        <div className="nav-bar-controls">
          <div>
            {isMatch && (
              <button
                onClick={() => history.goBack()}
                className="nav-bar-back-button"
              >
                <BackIcon /> Back
              </button>
            )}
          </div>
          <div>
            <button onClick={logOutUser} className="nav-bar-exit-button">
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
