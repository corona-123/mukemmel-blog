import Head from "next/head";

export default function Meta({ props }) {
  return (
    <section>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{`${props.title} - `}</title>
        <meta name="Description" content={props.description}></meta>
        <link rel="icon" href={props.thumbnailIcon} />
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
            overflow-y: scroll;
          }
          body {
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
          }
          a {
            text-decoration: none;
            color: #35459e;
            transition: opacity 0.2s ease;
          }
          a:hover {
            transition: opacity 0.2s ease;
            opacity: 0.5;
            text-decoration-color: inherit;
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
          li {
            margin-bottom: calc(1.45rem / 2);
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
          .layout {
            width: 100%;
            margin: 0 auto;
            background: rgb(238, 174, 202);
            background: radial-gradient(
              circle,
              rgba(238, 174, 202, 1) 0%,
              rgba(148, 187, 233, 1) 100%
            );
          }
          .content-background {
            background: rgba(250, 250, 250, 1);
            width: 100%;
            border-radius: 150px 150px 0 0;
            margin-top: -50px;
            padding-top: 5px;
          }
          // .content-container {
          //   max-width: 800px;
          //   margin: 0 auto;
          //   border: 4px;
          // }
          .blog {
            border: 4px solid #ebebebe;
            border-radius: 2% 2%;
            box-shadow: 0 4px 6px 0;
            padding: 10px 45px;
            margin: 40px auto;
          }
          .blog-date {
            text-align: right;
            color: #cccccc;
            margin: 12px 0 48px 0;
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
            // .content-container {
            //   max-width: 750px;
            //   margin: 0 auto;
            //   border: 4px;
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
