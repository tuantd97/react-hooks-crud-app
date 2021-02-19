const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // fork-ts-checker-webpack-plugin is used for type checking
              logLevel: 'info',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
};
