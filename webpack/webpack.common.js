const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== 'undefined';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const appDirectory = process.cwd();
const publicPath = path.resolve(appDirectory, 'public');
const buildPath = path.resolve(appDirectory, 'build');

module.exports = {
  entry: path.resolve(process.cwd(), 'src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
                paths: [path.resolve(__dirname, 'node_modules')],
                webpackImporter: false,
                modifyVars: {
                  'ant-prefix': 'crud',
                },
              },
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
  plugins: [
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    // Run typescript checker
    new ForkTsCheckerWebpackPlugin({
      async: !isProd,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: publicPath,
          to: buildPath,
        },
      ],
    }),
    new webpack.ProgressPlugin(),
    // isAnalyze && new BundleAnalyzerPlugin({ generateStatsFile: true }),
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  target: 'web',
  devServer: {
    contentBase: 'public',
    port: 3000,
    hot: true,
    watchContentBase: true,
    historyApiFallback: true,
  },
};
