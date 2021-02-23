/* eslint-disable import/no-extraneous-dependencies */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin({ extractComments: false })],
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg|json)$/,
      deleteOriginalAssets: true,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
    }),
  ],
};
