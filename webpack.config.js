var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var bourbon = require('node-bourbon');

var sassLoaders = [
  'css-loader',
  'sass-loader?includePaths[]=' + bourbon.with(path.resolve(__dirname, './src'))
]

console.log(sassLoaders);

module.exports = {
  entry: {
      markov: "./src/index.js"
  },
  output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].bundle.js",
      chunkFilename: "[id].chunk.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: new RegExp("node_modules|lib"),
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      filename: "commons.js",
      name: "commons"
    }),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['src', 'node_modules']
  }
};
