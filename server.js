'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const colors = require('colors');

const PORT = 3002;

const serverConfig = {
  contentBase: './public',
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
};

new WebpackDevServer(webpack(webpackConfig), serverConfig)
  .listen(PORT, 'localhost', err => {
    err && console.log(err);
    console.log(`Listening at ${`http://localhost:${PORT}/`.green}`);
  });
