/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const Dest = path.resolve(__dirname, './../dist');
const App = path.resolve(__dirname, './../app');

module.exports = {
  entry: {
    app: `${App}/index.js`,
    serviceWorker: `${App}/serviceWorker.js`,
  },
  output: {
    filename: '[name].js',
    path: Dest,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,

        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        include: '/.module.css$/',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: '/.module.css$/',
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebPackPlugin({
      template: `${App}/index.html`,
      filename: 'index.html',
      excludeChunks: ['serviceWorker'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: `${App}/manifest.json`, to: Dest },
        { from: `${App}/icons`, to: `${Dest}/icons` },
      ],
    }),
  ],
  externals: {
    moment: 'moment',
  },
};
