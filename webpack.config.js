var webpack = require("webpack");
module.exports = {
  entry: './components/App.js',
  devtool: 'source-map',
  output: {
  	path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }/*,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]*/
};
