import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import { signUpUser } from "../../redux/actions/auth";
import { RootState } from "../../redux/reducers";

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteChildrenProps;

const SignupPage: React.FC<Props> = (props) => {
  const { signUpUser, isAuthenticated } = props;
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    signUpUser(user);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={user.username}
          onChange={handleChange}
          name="username"
          autoComplete="on"
        />
        <label>E-mail</label>
        <input
          type="email"
          value={user.email}
          onChange={handleChange}
          name="email"
          autoComplete="on"
        />
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          onChange={handleChange}
          name="password"
          autoComplete="off"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { signUpUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
