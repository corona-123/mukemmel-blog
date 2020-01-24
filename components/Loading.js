import Meta from "./Meta";
import React from "react";

const Loading = () => {
  return (
    <div className="container text-center">
      <Meta></Meta>
      <h1>Loading ......</h1>
      <style jsx>
        {`
          html {
            height: 100%;
            box-sizing: border-box;
            overflow-y: scroll;
          }
          body {
            height: 100%;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
            background: rgba(250, 250, 250, 1);
            // font-family: "Work Sans", "Helvetica Neue", Helvetica, sans-serif;
            overflow-x: hidden;
            color: #000;
            font-size: 16px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: rgb(238, 174, 202);
            background: radial-gradient(
              circle,
              rgba(238, 174, 202, 1) 0%,
              rgba(148, 187, 233, 1) 100%
            );
          }
        `}
      </style>
    </div>
  );
};
export default Loading;
