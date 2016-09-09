'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const glob = require('glob');

module.exports = {
  entry: [ './src/index', 'babel-polyfill' ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/react-challenge-colorizr/',
  },

  resolve: {
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BUILD': JSON.stringify('pages'),
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),

    new HtmlWebpackPlugin({
      title: 'Colorizer',
      template: 'template.ejs',
    }),

    new ExtractTextPlugin('style.css'),
    new FaviconsWebpackPlugin({
      logo: './logo.png',
      background: '#e91e63',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new LodashModuleReplacementPlugin(),
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
        loader: ExtractTextPlugin.extract('css!sass!sass-resources!postcss'),
        include: path.join(__dirname, 'src'),
      },

      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },

      {
        test: /\.png$/,
        loaders: ['file']
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
  postcss: [ autoprefixer({ browsers: ['last 4 versions'] }) ] ,
};
