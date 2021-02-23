/* eslint-disable import/no-extraneous-dependencies */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin({ extractComments: false })],
  },
};
