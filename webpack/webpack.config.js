const { merge } = require('webpack-merge');
const CommonWebpack = require('./webpack-common.config');
const DevWebpack = require('./webpack-dev.config');
const ProdWebpack = require('./webpack-prod.config');
const AnalyzeWebpack = require('./webpack-analyze.config');

// eslint-disable-next-line
module.exports = function (env) {
  if (env.development === true) return merge(CommonWebpack, DevWebpack);
  if (env.production === true && env.analyze === true) return merge(CommonWebpack, ProdWebpack, AnalyzeWebpack);
  if (env.production === true) return merge(CommonWebpack, ProdWebpack);
  throw new Error('No valid config given.');
};
