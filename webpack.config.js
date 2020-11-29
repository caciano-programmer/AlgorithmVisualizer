const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// eslint-disable-next-line
module.exports = function (env) {
  const devtool = { devtool: 'eval-source-map' };
  const devServer = {
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 3000,
    },
  };
  const optimization = {
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
  };
  const webpack = {
    mode: env.production ? 'production' : 'development',
    entry: path.resolve(__dirname, './app/index.js'),
    output: { path: path.resolve(__dirname, 'dist') },
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
        },
      ],
    },
    plugins: [
      new ESLintPlugin(),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, './app/index.html'),
        filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  };
  return env.production ? { ...webpack, ...optimization } : { ...webpack, ...devtool, ...devServer };
};
