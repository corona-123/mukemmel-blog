const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const webPack = require("webpack");
require("dotenv").config();

module.exports = withCSS(
  withFonts(
    withSass({
      webpack(config, options) {
        config.module.rules.push({
          test: /\.md$/,
          use: "raw-loader"
        });
        const env = Object.keys(process.env).reduce((acc, curr) => {
          acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
          return acc;
        }, {});
        config.plugins.push(new webPack.DefinePlugin(env));
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
