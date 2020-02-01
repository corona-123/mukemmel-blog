import React from "react";
import Meta from "../components/Meta";
import { auth, firebase } from "../src/firebase";
import Router from "next/router";
// import "firebaseui";

class Login extends React.Component {
  // componentDidMount() {
  //   this.handleCustomSignIn;
  // }

  // handleCustomSignIn = () => {
  // };
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
    // let ui = new firebaseui.auth.AuthUI(firebase.auth());
    // var uiConfig = {
    //   callbacks: {
    //     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    //       // User successfully signed in.
    //       // Return type determines whether we continue the redirect automatically
    //       // or whether we leave that to developer to handle.
    //       return true;
    //     }
    //   },
    //   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    //   signInFlow: "popup",
    //   signInSuccessUrl: "/",
    //   signInOptions: [
    //     // Leave the lines as is for the providers you want to offer your users.
    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //     firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //     firebase.auth.PhoneAuthProvider.PROVIDER_ID
    //   ]
    // };
    // ui.start("#ui", uiConfig);
    return (
      // <div className="container">
      //   <div id="ui"></div>
      // </div>
      <section>
        <div className="container-fluid login-container">
          <a
            className="login-logo"
            href="https://www.linkedin.com/in/dorukhan-nerede-441ba9161/?originalSubdomain=tr"
          >
            <img src="/dnIcon.png"></img>
          </a>
          <div className=" container login-form-1">
            <Meta></Meta>
            <div className="form-group login-form-group">
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
              {/* <input
              onClick={this.handleCustomSignIn}
              type="submit"
              className="btnSubmit"
              value="Continue as Guest"
            /> */}
            </div>
          </div>
        </div>
        <style jsx global>{`
          body {
            background-image: url(./login-wall-1.jpg);
            background-size: cover;
          }
        `}</style>
      </section>
    );
  }
}

export default Login;
