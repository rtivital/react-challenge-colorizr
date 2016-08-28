'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const glob = require('glob');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:3002',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Colorizr',
      template: 'template.ejs',
    }),

    new FaviconsWebpackPlugin({
      logo: './logo.png',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      },
    }),

    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('development') },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
      },

      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass', 'sass-resources'],
        include: path.join(__dirname, 'src'),
      },

      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },

      {
        test: /\.png$/,
        loader: 'file',
      },

      {
        test: /\.svg$/,
        loader: 'svg-sprite?' + JSON.stringify({ name: '[hash]', prefixize: true }),
        include: path.join(__dirname, 'src/ui/Icon'),
      },

      {
        test: /\.svg$/,
        loader: 'file',
        include: path.join(__dirname, 'src/'),
        exclude: path.join(__dirname, 'src/ui/Icon'),
      },
    ],
  },

  sassResources: glob.sync('./src/styles/resources/**/*.scss'),
};
