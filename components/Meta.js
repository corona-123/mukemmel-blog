import Head from "next/head";
import { useRouter } from "next/router";

export default function Meta() {
  const router = useRouter();
  const slug = router.pathname;
  const postId = router.query.postId;
  let title;
  if (slug == "/") {
    title = "Home";
  } else {
    title = slug.replace(/\//g, " ");
    if (postId != undefined) {
      title = `Blogs/ ${postId}`;
    }
  }
  return (
    <section>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{`DN - ${title.toUpperCase()}`}</title>
        <meta name="Description" content="Mükemmel(!) Blog"></meta>
        <link rel="icon" href="/thumbnailIcon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        ></link>
      </Head>
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css?family=Work+Sans&display=swap");

          * {
            box-sizing: inherit;
          }
          html {
            // height: 100%;
            box-sizing: border-box;
            overflow-y: scroll;
            // background-image: url("./login-wall-1.jpg");
            // background-repeat: no-repeat;
            // background-size: cover;
          }
          body {
            padding-top: 100px;
            padding-bottom: 50px;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
            background: rgba(250, 250, 250, 1);
            overflow-x: hidden;
            color: #000;
            font-size: 16px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: rgb(255, 255, 255);
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(236, 237, 238, 1) 50%,
              rgba(255, 255, 255, 1) 100%
            );
          }
          ul {
            list-style: none;
            margin: 0;
            padding-bottom: 0;
            padding-left: 0;
            padding-right: 0;
            padding-top: 0;
            list-style-position: outside;
            list-style-image: none;
          }
          ol {
            margin: 0;
            padding-bottom: 0;
            padding-left: 0;
            padding-right: 0;
            padding-top: 0;
            list-style-position: outside;
            list-style-image: none;
          }
          ul,
          ol,
          p {
            margin-bottom: 1.45rem;
          }
          img {
            max-width: 100%;
          }
          img,
          figure,
          table,
          fieldset {
            margin-left: 0;
            margin-right: 0;
            margin-top: 0;
            padding-bottom: 0;
            padding-left: 0;
            padding-right: 0;
            padding-top: 0;
            margin-bottom: 1.45rem;
          }
          pre {
            margin-left: 0;
            margin-right: 0;
            margin-top: 0;
            margin-bottom: 1.45rem;
            font-size: 0.85rem;
            line-height: 1.42;
            background: hsla(0, 0%, 0%, 0.04);
            border-radius: 3px;
            overflow: auto;
            word-wrap: normal;
            padding: 1.45rem;
          }
          table {
            font-size: 1rem;
            line-height: 1.45rem;
            border-collapse: collapse;
            width: 100%;
          }
          blockquote {
            margin-left: 1.45rem;
            margin-right: 1.45rem;
            margin-top: 0;
            padding-bottom: 0;
            padding-left: 0;
            padding-right: 0;
            padding-top: 0;
            margin-bottom: 1.45rem;
          }
          strong {
            font-weight: bold;
          }
          ol li {
            padding-left: 0;
          }
          ul li {
            padding-left: 0;
          }
          li > ol {
            margin-left: 1.45rem;
            margin-bottom: calc(1.45rem / 2);
            margin-top: calc(1.45rem / 2);
          }
          li > ul {
            margin-left: 1.45rem;
            margin-bottom: calc(1.45rem / 2);
            margin-top: calc(1.45rem / 2);
          }
          blockquote *:last-child {
            margin-bottom: 0;
          }
          li *:last-child {
            margin-bottom: 0;
          }
          p *:last-child {
            margin-bottom: 0;
          }
          li > p {
            margin-bottom: calc(1.45rem / 2);
          }
          code {
            font-size: 0.85rem;
            line-height: 1.45rem;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          .spin {
            animation: spin 4s linear infinite;
            margin-top: 300px;
          }
          .login-container {
            height: 100%;
          }
          .blog {
            border: 4px solid #ebebebe;
            border-radius: 2% 2%;
            box-shadow: 0 4px 6px 0;
            padding: 10px 45px;
            margin: 40px auto;
          }
          .blog-author-container {
            color: #464646;
          }
          .blog-date-author {
            // text-align: right;
            display: flex;
            color: #cccccc;
            margin: 12px 0 48px 0;
          }
          .blog-author {
            font-weight: bold;
          }
          .span p {
            max-height: 130px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .blog-image {
            max-height: 300px;
            width: 100%;
            border-radius: 8px;
            border: 1px solid #ddd;
            padding: 5px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            object-fit: cover;
          }
          .blog-image:hover {
            box-shadow: 0 4px 8px 0 rgba(0, 140, 186, 0.5),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
            cursor: pointer;
          }
          .shadow-textarea {
            border: 1px solid #cccccc;
            border-radius: 1em;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 5px;
          }
          .shadow-textarea textarea.form-control::placeholder {
            font-weight: 300;
          }
          .shadow-textarea textarea.form-control {
            padding-left: 0.8rem;
          }
          .z-depth-1 {
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
              0 2px 10px 0 rgba(0, 0, 0, 0.12);
          }
          .back-container {
            cursor: pointer;
          }
          .back-container:hover {
            opacity: 0.9;
            text-decoration-color: inherit;
          }
          .back {
            width: fit-content;
            background: #282726;
            box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2),
              0 9px 26px 0 rgba(0, 0, 0, 0.19);
            padding: 5px;
            border-radius: 25%;
            color: #fff;
            font-size: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .back h2 {
            color: #fff;
            height: 100%;
            margin: 0;
            margin-left: 10px;
          }
          .btn-rounded {
            border-radius: 10em;
          }
          .btn-mdb-color {
            color: #fff;
            background-color: #59698d !important;
          }
          // .waves-effect {
          //   position: relative;
          //   overflow: hidden;
          //   height: fit-content;
          // }
          .file-field {
            cursor: pointer;
            z-indez: 100;
            align-items: center;
            text-transform: uppercase;
          }
          .file-field input[type="file"] {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            cursor: pointer;
            opacity: 0;
            filter: alpha(opacity=0);
          }
          .submit-field {
            cursor: pointer;
            z-indez: 100;
            text-transform: uppercase;
          }
          .submit-button {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            cursor: pointer;
            opacity: 0;
            filter: alpha(opacity=0);
          }
          .create-post {
            padding: 10%;
            background: rgba(250, 250, 250, 1);
            box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2),
              0 9px 26px 0 rgba(0, 0, 0, 0.19);
            // text-align: center;
            width: 100%;
            border-radius: 10em;
          }
          .comment-dropdown {
            cursor: pointer;
            align-self: center;
          }
          .comment-dropdown-icon-up {
            transform: rotate(180deg);
            transition: all 0.2s ease-out;
          }
          .comment-dropdown-icon-down {
            transition: all 0.2s ease-out;
          }
          .comment-date {
            text-align: right;
            color: #cccccc;
            margin: 12px 0 48px 0;
            align-self: flex-end;
            margin-bottom: 0;
          }
          .send-comment-button {
            height: fit-content;
            padding: 10px;
            width: fit-content;
            margin-left: 8px;
            align-self: center;
            cursor: pointer;
            color: #fff !important;
          }
           {
            /* //section------------------------------------- */
          }
          // html,
          // body {
          //   background-repeat: no-repeat;
          //   background: rgb(238, 174, 202);
          //   background: radial-gradient(
          //     circle,
          //     rgba(238, 174, 202, 1) 0%,
          //     rgba(148, 187, 233, 1) 100%
          //   );
          // }

          .container {
            height: 100%;
            align-content: center;
          }

          .card {
            height: 370px;
            margin-top: auto;
            margin-bottom: auto;
            width: 400px;
            background-color: rgba(0, 0, 0, 0.5) !important;
          }
          @keyframes appearLeft {
            0% {
              margin-left: -1000px;
            }
            15% {
              margin-left: -100px;
            }
            40% {
              margin-left: -110px;
            }
            50% {
              margin-left: -80px;
            }
            79% {
              margin-left: -20px;
            }
            80% {
              margin-left: -100px;
            }
            100% {
              margin-left: -1000px;
            }
          }
          .dorukhan img {
            position: absolute;
            width: 180px;
            margin-top: 19%;
            padding: 5px;
            margin-left: -1000px;
            transform: rotate(90deg);
            animation-name: appearLeft;
            animation-duration: 6s;
            animation-delay: 12s;
            animaiton-timing-function: linear;
            animation-iteration-count: infinite;
          }

          .login-container {
            margin-top: 5%;
            margin-bottom: 5%;
          }
          .login-logo {
            // position: relative;
            margin-left: -100px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
          }
          .login-logo:hover {
            margin-left: -30px;
            opacity: 1;
            text-decoration-color: inherit;
          }
          .login-logo img {
            position: absolute;
            width: 180px;
            margin-top: 19%;
            background: #282726;
            border-radius: 4.5rem;
            padding: 5px;
            transform: rotate(90deg);
            transition: all 0.2s ease;
          }
          .login-logo img:hover {
            transform: rotate(0deg);
          }
          .login-form-1 {
            padding: 10%;
            background: #282726;
            box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2),
              0 9px 26px 0 rgba(0, 0, 0, 0.19);
            text-align: center;
            width: 55%;
          }
          .login-form-1 h1 {
            text-align: center;
            margin-bottom: 12%;
            color: #fff;
          }

          .btnSubmit {
            font-weight: 600;
            width: 50%;
            color: #282726;
            background-color: #fff;
            border: none;
            border-radius: 1.5rem;
            padding: 2%;
          }
          .btnForgetPwd {
            color: #fff;
            font-weight: 600;
            text-decoration: none;
          }
          .btnForgetPwd:hover {
            text-decoration: none;
            color: #fff;
          }

          .mini-profile {
            width: 80px;
            background: #fff;
            box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2),
              0 9px 26px 0 rgba(0, 0, 0, 0.19);
            padding: 5px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            color: #464646;
            font-size: 15px;
            align-items: center;
            // border: 2px solid #464646;
            height: 80px;
          }
          .mini-profile-container {
            z-index: 1200;
            position: fixed;
            top: 0;
            right: 0;
          }

           {
            /* //TYPOGRAPHY------------------------------------- */
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            font-family: "Work Sans", "Helvetica Neue", Helvetica, sans-serif;
            margin-left: 0;
            margin-right: 0;
            margin-top: 0;
            padding-bottom: 0;
            padding-left: 0;
            padding-right: 0;
            padding-top: 0;
            margin-bottom: 1.45rem;
            color: inherit;
            text-rendering: optimizeLegibility;
          }

          h1,
          h2 {
            font-weight: 500;
          }

          h1 {
            font-size: 2rem;
            letter-spacing: -1px;
            line-height: 1.1875;
          }

          h2 {
            font-size: 1.7rem;
            letter-spacing: -0.75px;
            line-height: 1.2;
          }

          h3 {
            font-size: 1.2rem;
            letter-spacing: -0.5px;
            line-height: 1.1875;
            color: #a0a0a0;
            font-weight: normal;
          }

          p {
            font-size: 1.2rem;
            letter-spacing: -0.5px;
            line-height: 1.5;
            color: #464646;
          }

          @media (min-width: 1280px) {
            h1 {
              font-size: 2rem;
              letter-spacing: -1px;
              line-height: 1.1875;
            }

            h2 {
              font-size: 1.5rem;
              letter-spacing: -0.75px;
              line-height: 1.1667;
            }

            h3 {
              font-size: 1rem;
              letter-spacing: -0.5px;
              line-height: 1.1875;
              color: #a0a0a0;
              font-weight: normal;
            }

            p {
              line-height: 1.4375;
            }
          }

          @media (max-width: 992px) {
            h1 {
              font-size: 2rem;
              letter-spacing: -1px;
              line-height: 1.1875;
            }

            h2 {
              font-size: 1.5rem;
              letter-spacing: -0.75px;
              line-height: 1.1667;
            }

            h3 {
              font-size: 0.8rem;
              letter-spacing: -0.5px;
              line-height: 1.1875;
              color: #a0a0a0;
              font-weight: normal;
            }

            p {
              line-height: 1.4375;
            }
          }
        `}
      </style>
    </section>
  );
}
