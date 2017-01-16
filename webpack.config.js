var path = require('path');
var webpack = require('webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


module.exports = {
  entry: [
    'babel-polyfill',
    'bootstrap-sass!./bootstrap-sass.config.js',
    './src/theme/main.scss',
    './src/main',
    'webpack-hot-middleware/client?reload=true'
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'main.js'
  },
  index: './src/index.html',
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        plugins: ['lodash'],
        presets: ['es2015']
      }
    },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
    ]
  },
  devServer: {
    contentBase: "./src"
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      '_': 'lodash'
    })
  ]
};
