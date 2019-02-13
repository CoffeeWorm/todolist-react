const baseConf = require('./webpack.config.base');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseConf, {
  mode: 'production',
  output: {
    publicPath:'/todolist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsWebpackPlugin({}),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(c|le)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/[name][hash:8].css',
      chunkFilename: 'css/[id][hash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
