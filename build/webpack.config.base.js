const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    vender: ['react', 'react-dom']
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.join(__dirname, '../src/components')
    }
  },
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'js/[name]_bunlde.js'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg$)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[ext]',
              limit: 5 * 1024,
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[path][name].[ext]',
            limit: 1024 * 8,
            useRelativePath: true
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html'
    })
    // new CopyWebpackPlugin([
    //   {
    //     from: './static',
    //     to: './static'
    //   }
    // ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vender: {
          name: 'vender',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
};
