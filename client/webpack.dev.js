const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge.smartStrategy({
  'module.rules.use': 'prepend',
})(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 5050,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
