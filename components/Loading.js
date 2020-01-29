import Meta from "./Meta";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-free-solid";

const Loading = () => {
  return (
    <div className="container text-center">
      <Meta></Meta>
      <FontAwesomeIcon
        icon={faSpinner}
        width="70px"
        className="spin"
      ></FontAwesomeIcon>
    </div>
  );
};
export default Loading;
