import React, { useState } from "react";
import { connect } from "react-redux";
import { dateFormatted } from "../../helpers/dateFormatted";
import { firstLetterUpper } from "../../helpers/firstLetterUpper";
import { RootState } from "../../redux/reducers";
import UploadIcon from "../../icons/UploadIcon";
import { updateUserProfilePicture } from "../../redux/actions/user";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const SUPPORTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/jpg"
];

const UserProfilePage: React.FC<Props> = (props) => {
  const { user, token, updateUserProfilePicture } = props;
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [error, setError] = useState<string>();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const selected = e.target.files[0];

    // console.log(selected);
    // if (e.target.files && e.target.files[0]) {
    //   setSelectedImage(URL.createObjectURL(e.target.files[0]));
    // }

    if (selected && SUPPORTED_IMAGE_TYPES.includes(selected.type)) {
      // displaying selected image
      setSelectedImage(URL.createObjectURL(selected));
      setSelectedFile(selected);
      setError(undefined);
      // updateUserProfilePicture(selected, token);
    } else {
      setSelectedFile(undefined);
      setError("Please select an image file!");
    }

    // TODO: if submitted find in state and replace it
  };

  const handleImageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!selectedFile) return;
    e.preventDefault();
    console.log("click");
    updateUserProfilePicture(selectedFile, token);
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-page-info">
        <label>Username:</label>
        <p>{firstLetterUpper(user.username)}</p>
        <label>Created:</label>
        <p>{dateFormatted(user.created_on)}</p>
        <label>Email:</label>
        <p>{user.email}</p>
      </div>
      <div className="user-profile-page-image">
        <img src={selectedImage ? selectedImage : user.user_image_url} />
        <form
          className="user-profile-page-upload-form"
          onSubmit={handleImageSubmit}
        >
          <label>
            <input type="file" name="image" onChange={changeHandler} />
            <span>+</span>
          </label>
          {selectedFile && <button type="submit">{<UploadIcon />}</button>}
        </form>
        <div className="output">
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  token: state.auth.token
});

const mapDispatchToProps = { updateUserProfilePicture };

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
