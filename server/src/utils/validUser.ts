export const validSignupUser = (
  email: string,
  password: string,
  username: string
) => {
  const validEmail =
    typeof email === "string" && email.trim() !== "" && email.includes("@");
  const validPassword =
    typeof password === "string" && password.trim() !== "" && email.length > 5;
  const validUsername =
    typeof username === "string" &&
    username.trim() !== "" &&
    username.length > 3;

  return validEmail && validPassword && validUsername;
};

export const validLoginUser = (email: string, password: string) => {
  const validEmail =
    typeof email === "string" && email.trim() !== "" && email.includes("@");
  const validPassword =
    typeof password === "string" && password.trim() !== "" && email.length > 5;

  return validEmail && validPassword;
};
