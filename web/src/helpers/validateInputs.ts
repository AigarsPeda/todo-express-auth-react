// export const validateInputs = (
//   userData: IUser,
//   setError: React.Dispatch<React.SetStateAction<IError>>
// ) => {
//   const { username, password, role } = userData;
//   let errorMsg = {
//     usernameError: "",
//     passwordError: "",
//     roleError: ""
//   };
//   let formValid = true;

//   // Username validation
//   if (!username) {
//     formValid = false;
//     errorMsg.usernameError = "Please enter a username.";
//   }
//   if (typeof username !== undefined) {
//     if (username.length <= 3 || username.length > 8) {
//       formValid = false;
//       errorMsg.usernameError = "Username must be between 4 and 8 characters.";
//     }
//   }

//   // Password validation
//   if (!password) {
//     formValid = false;
//     errorMsg.usernameError = "Please enter a password.";
//   }
//   if (typeof password !== undefined) {
//     if (!password.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[a-z]).*$/)) {
//       formValid = false;
//       errorMsg.passwordError = "Password requires at least 6 characters.";
//     }
//   }

//   // Role validation
//   if (role === "") {
//     formValid = false;
//     errorMsg.roleError = "Please select a role.";
//   }

//   setError(errorMsg);
//   return formValid;
// };
