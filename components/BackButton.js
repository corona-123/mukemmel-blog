import React from "react";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/fontawesome-free-solid";

const BackButton = () => (
  <a className="back-container" onClick={() => Router.back()}>
    <div className="container float-right mr-4 back">
      <FontAwesomeIcon icon={faAngleDoubleLeft} width="30px"></FontAwesomeIcon>
      <h2>Back</h2>
    </div>
  </a>
);
export default BackButton;
