const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, "src")
      ]
    }, {
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, "src")
      ]
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
  },
  output: {
    filename: 'service-block.js',
    path: path.resolve(__dirname, '../js')
  },
  externals: require("./externals.js")
};