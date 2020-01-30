import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { auth } from "../src/firebase/index";
import Router from "next/router";

const Profile = ({ anotherUser }) => {
  let user = anotherUser;
  let display;
  let image;
  if (auth) {
    if (auth.currentUser.isAnonymous) {
      display = "Guest";
      image = (
        <div className="container float-right mr-4 mini-profile">
          <FontAwesomeIcon icon={faUser} width="35px"></FontAwesomeIcon>
          {display}
        </div>
      );
    } else {
      user = auth.currentUser;
      let firstLetter = user.displayName.slice(0, 1);
      let secondLetter = user.displayName.split(" ")[1];
      secondLetter = secondLetter.slice(0, 1);
      display = firstLetter + secondLetter;
      image = (
        <img
          src={user.photoURL}
          className="container float-right mr-4 mini-profile"
          title={display}
        ></img>
      );
    }
  }

  return anotherUser != null ? (
    image
  ) : (
    <a
      className="back-container"
      onClick={() => {
        Router.push("/profile");
      }}
    >
      {image}
    </a>
  );
};
export default Profile;
