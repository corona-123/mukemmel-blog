import React from "react";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleDoubleLeft } from "@fortawesome/fontawesome-free-solid";
import withAuth from "../src/helpers/withAuth";

const Profile = ({ name }) => (
  <a
    className="back-container"
    onClick={() => {
      console.log("asd");
      withAuth(Profile);
    }}
  >
    <div className="container float-right mr-4 mini-profile">
      <FontAwesomeIcon icon={faUser} width="35px"></FontAwesomeIcon>
      {name == undefined ? "Guest" : "dn"}
    </div>
  </a>
);
export default Profile;
