var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.join(__dirname, 'src');
var BUILD_DIR = path.join(__dirname, 'build');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(SRC_DIR, 'index.jsx')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: SRC_DIR,
      }
  ]},
  output: {
    filename: 'index.js',
    path: BUILD_DIR,
    publicPath: '/build/',
  },
  resolve: {
    modulesDirectories: [SRC_DIR, 'node_modules'],
    extensions: ['', '.jsx', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __PRODUCTION__: false,
    })
  ]
};
