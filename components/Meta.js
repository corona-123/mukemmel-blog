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
        <title>{`DN - ${title.toUpperCase().split("/")[0]}`}</title>
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
            box-sizing: border-box;
          }
          body {
            padding-top: 70px;
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
            height: -webkit-fill-available;
          }
          .wrap {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
          }
          .box {
            margin: 10px;
            width: 300px;
            height: 490px;
            text-align: center;
            border-radius: 3px;
            -webkit-transition: 200ms ease-in-out;
            -o-transition: 200ms ease-in-out;
            transition: 200ms ease-in-out;
            -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
          .box:hover {
            margin-bottom: -10px;
            -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
          }
          .box h1 {
            color: #fff;
            padding: 30px;
            margin-top: 100px;
            text-align: center;
            font-weight: 100;
            font-size: 25px;
            background: rgba(0, 0, 0, 0.8);
            -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
          }

          .date h4 {
            color: #fff;
            font-weight: 300;
            text-align: center;
            letter-spacing: 3px;
            text-shadow: 0 0 3px rgba(0, 0, 0, 0.9);
            background: rgba(0, 0, 0, 0.8);
            -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
          }
          .poster {
            width: 130px;
            height: 130px;
            margin: 100px auto;
            position: relative;
            border-radius: 100px;
            overflow: hidden;
          }
          // .poster h4 {
          //   top: 17px;
          //   color: #fff;
          //   position: relative;
          //   font-size: 80px;
          //   text-align: center;
          //   font-weight: 100;
          // }
          .poster h4 {
            top: 16px;
            color: #fff;
            position: relative;
            font-size: 80px;
            text-align: center;
            font-weight: 100;
            background: #fff;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.8);
            -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
            padding: 8px;
          }
          // .p1 {
          //   background: #da22ff; /* fallback for old browsers */
          //   background: -webkit-linear-gradient(
          //     to right,
          //     #9733ee,
          //     #da22ff
          //   ); /* Chrome 10-25, Safari 5.1-6 */
          //   background: -webkit-gradient(
          //     linear,
          //     left top,
          //     right top,
          //     from(#9733ee),
          //     to(#da22ff)
          //   );
          //   background: -webkit-linear-gradient(left, #9733ee, #da22ff);
          //   background: -o-linear-gradient(left, #9733ee, #da22ff);
          //   background: linear-gradient(
          //     to right,
          //     #9733ee,
          //     #da22ff
          //   ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          //   -webkit-box-shadow: 0 0 20px violet;
          //   box-shadow: 0 0 20px violet;
          // }
          #input-profile {
            display: none;
          }
          .link-black {
            color: inherit;
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
          .blue {
            color: #0056b3;
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
          .isDisabled {
            cursor: not-allowed !important;
            pointer-events: none;
            opacity: 0.5;
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
            margin: 14px 0 30px 0;
          }
          .blog-author {
            font-weight: bold;
          }

          //Yeni

          * {
            box-sizing: border-box;
            line-height: 1.5;
            font-family: "Open Sans", sans-serif;
          }

          img {
            max-width: 100%;
          }

          .card-container {
            display: flex;
            // flex-direction: row;
            align-items: center;
            justify-content: center;
            height: 85vh;
            // background: #444;
          }

          .card-blog {
            position: relative;
            background: #333;
            width: 400px;
            height: 75vh;
            border-radius: 6px;
            padding: 2rem;
            color: #aaa;
            box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2),
              0 0 1rem rgba(0, 0, 0, 0.2);
            overflow: hidden;
          }

          .card__image-container {
            margin: -2rem -2rem 1rem -2rem;
            cursor: pointer;
          }

          .card__line {
            opacity: 0;
            animation: LineFadeIn 0.8s 0.8s forwards ease-in;
          }

          .card__image {
            opacity: 0;
            animation: ImageFadeIn 0.8s 1.4s forwards;
            height: 321px;
            object-fit: cover;
          }

          .card__title {
            color: white;
            margin-top: 0;
            font-weight: 800;
            letter-spacing: 0.01em;
            cursor: pointer;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .card__title:hover {
            color: #545580 !important;
          }

          .card__content {
            margin-top: -3rem;
            opacity: 0;
            animation: ContentFadeIn 0.8s 1.6s forwards;
          }
          .card__content p {
            color: #aaa !important;
          }
          .card__content .author {
            cursor: pointer;
          }
          .card__content .author:hover {
            color: #545580 !important;
          }
          .card__details {
            --max-lines: 10;
            --lh: 1.2rem;
            max-height: calc(var(--lh) * var(--max-lines));
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: justify;
          }
          .card__details:before {
            content: "...";
            position: absolute;
            bottom: 152px;
            right: -16px;
          }
          // .card__details p {
          //   --max-lines: 10;
          //   --lh: 1.2rem;
          //   max-height: calc(var(--lh) * var(--max-lines));
          //   text-overflow: ellipsis;
          //   overflow: hidden;
          //   text-align: justify;
          // }
          // .card__details p:before {
          //   content: "...";
          //   position: absolute;
          //   bottom: 152px;
          //   right: -16px;
          // }

          .card__svg {
            position: absolute;
            left: 0;
            top: 115px;
            cursor: pointer;
          }

          @keyframes LineFadeIn {
            0% {
              opacity: 0;
              d: path(
                "M 0 300 Q 0 300 0 300 Q 0 300 0 300 C 0 300 0 300 0 300 Q 0 300 0 300 "
              );
              stroke: #fff;
            }
            50% {
              opacity: 1;
              d: path(
                "M 0 300 Q 50 300 100 300 Q 250 300 350 300 C 350 300 500 300 650 300 Q 750 300 800 300"
              );
              stroke: #888bff;
            }
            100% {
              opacity: 1;
              d: path(
                "M -2 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 802 400"
              );
              stroke: #545581;
            }
          }

          @keyframes ContentFadeIn {
            0% {
              transform: translateY(-1rem);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes ImageFadeIn {
            0% {
              transform: translate(-0.5rem, -0.5rem) scale(1.05);
              opacity: 0;
              filter: blur(2px);
            }
            50% {
              opacity: 1;
              filter: blur(2px);
            }
            100% {
              transform: translateY(0) scale(1);
              opacity: 1;
              filter: blur(0);
            }
          }

          //Yeni

          .span p {
            // max-height: 130px;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
          }
          .span {
            // max-height: 130px;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
            overflow: hidden;
            height: 4.5em;
            display: block;
            position: relative;
            width: 100%;
          }
          .span :after {
            content: " ";
            position: absolute;
            display: block;
            width: 100%;
            height: 1em;
            bottom: 0px;
            left: 0px;
            background: rgb(255, 255, 255);
          }
          .span:before {
            content: "...";
            text-align: right;
            position: absolute;
            display: block;
            width: 2em;
            height: 1em;
            bottom: 1em;
            right: 20px;
            // background: -moz-linear-gradient(
            //   left,
            //   rgba(255, 255, 255, 0) 0%,
            //   rgba(255, 255, 255, 1) 38%,
            //   rgba(255, 255, 255, 1) 99%
            // );
            // background: -webkit-gradient(
            //   linear,
            //   left top,
            //   right top,
            //   color-stop(0%, rgba(255, 255, 255, 0)),
            //   color-stop(38%, rgba(255, 255, 255 1)),
            //   color-stop(99%, rgba(255, 255, 255, 1))
            // );
            // background: -webkit-linear-gradient(
            //   left,
            //   rgba(255, 255, 255, 0) 0%,
            //   rgba(255, 255, 255, 1) 38%,
            //   rgba(255, 255, 255, 1) 99%
            // );
            // background: -o-linear-gradient(
            //   left,
            //   rgba(255, 255, 255, 0) 0%,
            //   rgba(255, 255, 255, 1) 38%,
            //   rgba(255, 255, 255, 1) 99%
            // );
            // background: -ms-linear-gradient(
            //   left,
            //   rgba(255, 255, 255, 0) 0%,
            //   rgba(255, 255, 255, 1) 38%,
            //   rgba(255, 255, 255, 1) 99%
            // );
            // background: linear-gradient(
            //   to right,
            //   rgba(255, 255, 255, 0) 0%,
            //   rgba(255, 255, 255, 1) 38%,
            //   rgba(255, 255, 255, 1) 99%
            // );
          }
          .blog-image {
            max-height: 300px;
            width: 100%;
            border-radius: 8px;
            border: 1px solid #ddd;
            padding: 5px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            object-fit: cover;
            min-height: 300px;
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
          .white-background {
            background: white;
            padding: 10px;
            border-radius: 10px;
          }
          .read-more {
            cursor: pointer;
            color: #007bff !important;
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
            width: fit-content;
          }
          .login-form-1 h1 {
            text-align: center;
            margin-bottom: 12%;
            color: #fff;
          }
          // .login-form-group {
          //   background: #742f77;
          //   padding: 30px;
          // }

          .btnSubmit {
            font-weight: 600;
            width: 50%;
            color: #282726;
            background-color: #fff;
            border: none;
            border-radius: 1.5rem;
            padding: 20px;
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
          .profile-background {
            background-image: url(https://i.redd.it/b3esnz5ra34y.jpg);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            padding: 2.5em;
            border-radius: 1em;
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
          .placeholder-mini-profile {
            width: 80px;
          }
          .profile-information {
            width: 150px;
            background: #fff;
            padding: 5px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            color: #464646;
            font-size: 15px;
            align-items: center;
            height: 150px;
          }
          .commentor-container {
            cursor: pointer;
            text-decoration: none;
          }
          .commentor-container h5:hover {
            cursor: pointer;
            text-decoration: none;
          }
          a:hover {
            text-decoration: none;
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
          .nav-item a {
            color: rgba(255, 255, 255, 0.88) !important;
            width: 150px;
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
            .navbar-expand-lg {
              flex-flow: row nowrap;
            }
            .navbar-nav {
              flex-flow: row nowrap;
              justify-content: center;
            }
            .nav-item .nav-link span {
              display: none;
            }
            .nav-item a {
              color: rgba(255, 255, 255, 0.88) !important;
              width: 80px !important;
            }

            // .nav-item .nav-link *:first-child {
            //   width: 50px;
            // }
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
