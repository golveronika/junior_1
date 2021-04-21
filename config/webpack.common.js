const path = require('path');
const argv = require('yargs').argv;
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');


const generateHtmlPlugin = (title) => {
    return new htmlWebpackPlugin({
      title,
      filename: `${title}.html`,
      template: `./src/public/pages/${title}.html`,
      favicon: "./src/public/favicon.ico"
    });
}

const populateHtmlPlugins = (pagesArray) => {
    res = [];
    pagesArray.forEach(page => {
      res.push(generateHtmlPlugin(page));
    })
    return res;
}

const pages = populateHtmlPlugins(["counter","form", "header", "landing", "sliders", "to_do"]);

const ENV = argv.mode
const isProduction = ENV === 'production' ? true : false
const shouldUseSourceMap = ENV === 'development' ? true : false

module.exports = {
  target: 'web',
  entry: './src/js/index.js',
  mode: ENV,
  devtool: isProduction ? 'eval' : 'source-map',
  
  devServer: {
    port: 5000,
  },
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './../build')
  },
  module: {
    rules: [
        {
            test: /\.html$/i,
            loader: 'html-loader',
            options: {},
          },
          {
            test: /\.(jpg|png|svg)$/,
            type: 'asset/resource',
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                }
            },
          },
          {
            // CSS SASS SCSS
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  sourceMap: shouldUseSourceMap,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: shouldUseSourceMap,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: function () {
                            return [autoprefixer]
                        },                        
                    },
                    sourceMap: shouldUseSourceMap,
                  }
              },
            ],
         },
      ],
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      }),
    new htmlWebpackPlugin({
        template: `./src/public/index.html`,
        filename: "index.html",
        title: "index",
        favicon: "./src/public/favicon.ico"
    }),
    ...pages
  ]
};