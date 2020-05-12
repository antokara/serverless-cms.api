import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import { config as publicGraphql } from './resources/publicGraphql/webpack.config';
import { config as publicFiles } from './resources/publicFiles/webpack.config';

const buildPath: string = path.join(__dirname, '/.aws-sam/build');
const resourcesPath: string = `${buildPath}/resources`;
let mode: 'development' | 'production' | 'none' | undefined = 'production';
if (
  (process.env.NODE_ENV && process.env.NODE_ENV === 'development') ||
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'none'
) {
  mode = process.env.NODE_ENV;
}
const baseOptions: Configuration = {
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
  mode,
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
      // public graphql
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
      // public files
      {
        context: path.join(__dirname, '/resources/publicFiles'),
        from: 'package.json',
        to: `${resourcesPath}/publicFiles/[name].[ext]`,
      },
      {
        context: path.join(__dirname, '/resources/publicFiles'),
        from: 'node_modules/',
        to: `${resourcesPath}/publicFiles/node_modules/`,
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

module.exports = [merge(baseOptions, publicGraphql, publicFiles)];
