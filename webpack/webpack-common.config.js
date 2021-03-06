/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */

const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { v4: uuidv4 } = require('uuid');

const Dest = path.resolve(__dirname, './../dist');
const App = path.resolve(__dirname, './../app');
const uuid = uuidv4();

function FilesListPlugin() {}
FilesListPlugin.prototype.apply = compiler => {
  compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
    const filelist = Object.keys(compilation.assets).map(fileName => `'${fileName}'`);
    compilation.assets['filesList.js'] = {
      source: () => `const getFilesList = () => [${filelist}]`,
      size: () => filelist.length,
    };
    callback();
  });
};

module.exports = {
  entry: {
    app: [`${App}/index.js`],
    serviceWorker: `${App}/serviceWorker.js`,
  },
  output: {
    filename: filePath => (filePath.chunk.name === 'serviceWorker' ? `${uuid}.[name].js` : '[name].[contenthash].js'),
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
      template: `${App}/index.ejs`,
      filename: 'index.html',
      excludeChunks: ['serviceWorker'],
      favicon: `${App}/public/favicon/leaderboard16.png`,
      templateParameters: {
        serviceWorker: `${uuid}.serviceWorker.js`,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin({
      patterns: [{ from: `${App}/public/icons`, to: `${Dest}/icons` }],
    }),
    new FilesListPlugin(),
  ],
};
