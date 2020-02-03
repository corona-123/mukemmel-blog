import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { auth } from "../src/firebase/index";
import Router from "next/router";

const Profile = ({ User, otherProfile }) => {
  let user = User;
  let display;
  let image;
  // if (User != null) {
  if (auth.currentUser != null) {
    if (auth.currentUser != undefined && auth.currentUser != null) {
      if (auth.currentUser.isAnonymous) {
        display = "Guest";
        image = otherProfile ? (
          auth.currentUser.isAnonymous ? (
            <img
              src={
                "https://w0.pngwave.com/png/18/809/user-computer-icons-person-icon-png-clip-art.png"
              }
              className="container float-left mr-4 profile-information"
            ></img>
          ) : (
            <div className="container float-left mr-4 profile-information">
              <FontAwesomeIcon icon={faUser} width="100px"></FontAwesomeIcon>
              {display}
            </div>
          )
        ) : (
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
        image = User ? (
          <img
            src={
              otherProfile
                ? "https://w0.pngwave.com/png/18/809/user-computer-icons-person-icon-png-clip-art.png"
                : user.photoURL
            }
            className="container float-left mr-4 profile-information"
            title={display}
          ></img>
        ) : (
          <img
            src={
              "https://w0.pngwave.com/png/18/809/user-computer-icons-person-icon-png-clip-art.png"
            }
            className="container float-left mr-4 profile-information"
          ></img>
        );
      }
    }
  } else {
    display = "Guest";
    image = (
      <div className="container float-right mr-4 mini-profile">
        <FontAwesomeIcon icon={faUser} width="35px"></FontAwesomeIcon>
        {display}
      </div>
    );
  }
  return User != null ? (
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
