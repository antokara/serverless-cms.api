const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const publicGraphql = require('./resources/publicGraphql/webpack.config');

const buildPath = path.join(__dirname, '/.aws-sam/build');
const resourcesPath = `${buildPath}/resources`;

const baseOptions = {
  output: {
    filename: '[name]/app.js',
    libraryTarget: 'commonjs',
    libraryExport: 'handler',
    library: 'handler',
    path: resourcesPath,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      resources: path.resolve(__dirname, 'resources/'),
    },
  },
  target: 'node',
  mode: process.env.NODE_ENV || 'production',
  module: {
    rules: [
      // fixes https://github.com/graphql/graphql-js/issues/1272
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      { test: /\.[tj]s$/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: 'template.yaml',
        to: `${buildPath}/[name].[ext]`,
      },
      {
        context: path.join(__dirname, '/resources/publicGraphql'),
        from: 'package.json',
        to: `${resourcesPath}/publicGraphql/[name].[ext]`,
      },
      {
        context: path.join(__dirname, '/resources/publicGraphql'),
        from: 'node_modules/',
        to: `${resourcesPath}/publicGraphql/node_modules/`,
        toType: 'dir',
      },
    ]),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
    }),
  ],
  stats: {
    excludeAssets: [/node_modules/],
  },
};

module.exports = [merge(baseOptions, publicGraphql)];
