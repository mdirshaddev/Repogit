const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const eslintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  output: {
    filename: 'static/js/[name].bundle.js'
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
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Repogit',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/ico/icons8-github-48.png')
    }),
    new DotEnv({
      path: path.resolve(__dirname, '../.env'), 
      allowEmptyValues: false, // no empty variables will be allowed
      silent: false, // we want every single errors
      systemvars: true // for CI purposes
    }), // we are loading env variables in the runtime of webpack build
    new eslintWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    })
  ],
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    historyApiFallback: true,
    watchContentBase: true,
    port: 8000,
    hot: true,
    liveReload: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/ // experimenting 💥
    }
  },
  target: 'web'
};