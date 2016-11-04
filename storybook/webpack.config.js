// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const config = require('../webpack.config');

module.exports = {
  module: {
    loaders: config.module.loaders,
  },

  sassResources: config.sassResources,
  postcss: config.postcss,
};
