const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  favicon: './public/favicon.ico'
});


const outputDirectory = './dist';

const cleanPlugin = new CleanWebpackPlugin({
  cleanStaleWebpackAssets: true,
  dry: true,
});

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [htmlPlugin, cleanPlugin, "transform-runtime", {
    "regenerator": true
  }],
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: outputDirectory,
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:8080'
    }
  },
};
