import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import baseConfig from './webpack.config.babel';

export default merge.smart(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: './server/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },

  target: 'node',
  externals: [nodeExternals()],
  plugins: [new webpack.IgnorePlugin(/\.(css|scss)$/)],
});
