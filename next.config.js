const withSass = require('@zeit/next-sass');

let config = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': `${__dirname}/src/styles`,
      '@assets': `${__dirname}/src/assets`,
    };

    return config;
  },
};

config = withSass(config);

module.exports = config;
