import React, { Component } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  // will return to things: 1 - our token, 2- the user session
  // if this.state.user is null, it means that no one is logged in. If the user is logged in, you will get the user object back from the database.
  state = {
    user: null
  };

  // will pass in the user and the history from react router. Because once we log in we want to be pushed to the homepage. Pass in the user object which contains the users email, name, etc.
  handleLogin = (user, history) => {
    axios
      .post("/api/auth/sign_in", user)
      .then((res) => {
        this.setState({ user: res.data.data });
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  handleRegister = (user, history) => {
    axios
      .post("/api/auth", user)
      .then((res) => {
        // in the response, it came back as an object called data
        this.setState({ user: res.data.data });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // don't need to pass user information to log out
  // set the user back to null because there is no longer a user logged in
  handleLogout = (history) => {
    axios
      .delete("/api/auth/sign_out")
      .then((res) => {
        this.setState({ user: null });
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { user } = this.state;

    // ***authenticated: user != null, will check to see if the user is authenticated or not
    // setUser: will pass in the user we get from the database and set that user to the state.

    return (
      <AuthContext.Provider
        value={{
          user,
          authenticated: user != null,
          handleLogin: this.handleLogin,
          handleRegister: this.handleRegister,
          handleLogout: this.handleLogout,
          setUser: (user) => this.setState({ user })
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
