const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {};

let config = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),

  publicRuntimeConfig: {
    localeSubpaths,
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': `${__dirname}/src/styles`,
      '@assets': `${__dirname}/src/assets`,
    };

    config.module.rules.push(
      {
        test: /\.svg$/,
        use: 'raw-loader'
      }
    );

    return config;
  },
};

config = withCSS(withSass(config));

module.exports = config;
