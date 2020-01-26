import React from "react";
import Meta from "../components/Meta";
import { auth, firebase } from "../src/firebase";
import Router from "next/router";

class Login extends React.Component {
  handleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    auth
      .signInWithPopup(provider)
      .then(() => {
        alert("You are signed In");
        Router.push("/");
      })
      .catch(err => {
        alert("OOps something went wrong check your console");
        console.log(err);
      });
  };
  handleLogout = () => {
    auth
      .signOut()
      .then(function() {
        alert("Logout successful");
      })
      .catch(err => {
        alert("OOps something went wrong check your console");
        console.log(err);
      });
  };
  handleGuestSignIn = () => {
    auth
      .signInAnonymously()
      .then(() => {
        alert("You are signed In as a Guest");
        Router.push("/");
      })
      .catch(err => {
        alert("OOps something went wrong check your console");
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container-fluid login-container">
        <a
          className="login-logo"
          href="https://www.linkedin.com/in/dorukhan-nerede-441ba9161/?originalSubdomain=tr"
        >
          <img src="/dnIcon.png"></img>
        </a>
        <div className="container login-form-1">
          <Meta></Meta>
          <div className="form-group">
            <input
              onClick={this.handleSignIn}
              type="submit"
              className="btnSubmit m-4"
              value="Login With Google Auth"
            />
            <input
              onClick={this.handleGuestSignIn}
              type="submit"
              className="btnSubmit"
              value="Continue as Guest"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
