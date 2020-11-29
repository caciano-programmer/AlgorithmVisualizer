/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './../dist'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
};
