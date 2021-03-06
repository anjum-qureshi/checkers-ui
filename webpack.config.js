const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const path = require("path");
const webpack = require('webpack')

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  favicon: "./public/favicon.ico",
  title: "vellyscope",
  mobile: true,
});

const outputDirectory = "./dist";

const cleanPlugin = new CleanWebpackPlugin({
  cleanStaleWebpackAssets: true,
  dry: true,
});

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "./bundle.js",
    clean: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    htmlPlugin,
    cleanPlugin,
  ],
  module: {
    rules: [{
        test: /.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
        ]
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: outputDirectory,
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/api/*": "http://localhost:8080",
    },
    compress: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    },
    overlay: {
      warnings: true,
      errors: true
    },
  },
};
