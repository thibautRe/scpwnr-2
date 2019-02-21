const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const babelOptions = require('./babel.config')

module.exports = (mode) => ({
  mode,
  entry: [path.resolve('client', 'index.js')],
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: babelOptions },
      },
      {
        test: /\.(woff2?)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `SCPWNR2`,
    }),
  ].filter(Boolean),
  devtool: 'source-map',
  devServer: {
    quiet: true,
    clientLogLevel: 'error',
  },
})
