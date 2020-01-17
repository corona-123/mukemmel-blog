const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");

module.exports = withCSS(
  withFonts(
    withSass({
      webpack(config, options) {
        config.module.rules.push({
          test: /\.md$/,
          use: "raw-loader"
        });
        return config;
      }
    })
  )
);

// module.exports = {
//   webpack: config => {
//     config.module.rules.push({
//       test: /\.md$/,
//       use: "raw-loader"
//     });

//     return config;
//   }
// };
