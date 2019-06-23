const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  mode: 'production',
  output: {
    filename: (chunkData) => {
      const isServiceWorker = chunkData.chunk.name.endsWith('-sw');
      return isServiceWorker ? '[name].js' : '[name]-[hash].js';
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
  ],
});
