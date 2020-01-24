// implement login
import React from "react";
import Meta from "../components/Meta";
import BackButton from "../components/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faKey,
  faAngleDoubleLeft
} from "@fortawesome/fontawesome-free-solid";
import {
  faInstagram,
  faFacebookSquare,
  faGooglePlusSquare,
  faTwitterSquare
} from "@fortawesome/free-brands-svg-icons";

// library.add(faUser);

const Login = () => (
  <div className="container-fluid login-container">
    <a
      className="login-logo"
      href="https://www.linkedin.com/in/dorukhan-nerede-441ba9161/?originalSubdomain=tr"
    >
      <img src="/dnIcon.png"></img>
    </a>
    <BackButton></BackButton>
    <div className="container login-form-1">
      <Meta></Meta>

      <h1 className="display-2">Login</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control w-100"
          placeholder="Your Email*"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control w-100"
          placeholder="Your Password*"
        />
      </div>
      <div className="form-group">
        <input type="submit" className="btnSubmit" value="Login" />
      </div>
      <div className="form-group">
        <a href="#" className="btnForgetPwd">
          Forget Password?
        </a>
      </div>
    </div>
  </div>
);

Login.getInitialProps = async ({ req }) => {
  return { props: null };
};

export default Login;
