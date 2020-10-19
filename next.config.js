const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

let config = {
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
