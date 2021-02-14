const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[fullhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          }
        ]
      },
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: '2',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Repogit',
        filename: 'index.html',
        template: path.resolve(__dirname, '../public/index.html'),
        favicon: path.resolve(__dirname, '../public/ico/icons8-github-48.png'),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    })
  ],
};