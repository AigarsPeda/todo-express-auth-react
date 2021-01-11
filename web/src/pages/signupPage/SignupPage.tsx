import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, RouteChildrenProps } from "react-router-dom";
import Headline from "../../components/headline/Header";
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
    signUpUser(user);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-page">
      <Headline />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.username}
          onChange={handleChange}
          name="username"
          autoComplete="on"
          placeholder="Username"
        />
        <input
          type="email"
          value={user.email}
          onChange={handleChange}
          name="email"
          autoComplete="on"
          placeholder="E-mail"
        />
        <input
          type="password"
          value={user.password}
          onChange={handleChange}
          name="password"
          autoComplete="off"
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/login">Have a account?</Link>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { signUpUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
