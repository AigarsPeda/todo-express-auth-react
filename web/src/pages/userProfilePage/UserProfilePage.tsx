import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducers";
import { firstLetterUpper } from "../../helpers/firstLetterUpper";
import { dateFormatted } from "../../helpers/dateFormatted";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const UserProfilePage: React.FC<Props> = (props) => {
  const { user } = props;
  return (
    <div className="user-profile-page">
      <div className="user-profile-page-info">
        <label className="user-name">
          Username:
          <p>{firstLetterUpper(user.username)}</p>
        </label>
        <label>
          Created:
          <p>{dateFormatted(user.created_on)}</p>
        </label>
        <label>
          Email:
          <p>{user.email}</p>
        </label>
      </div>
      <div className="user-profile-page-image">
        <img src={user.user_image_url} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
