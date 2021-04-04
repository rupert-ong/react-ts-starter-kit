const path = require('path');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const commonConfig = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
};

const developmentConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: '.env.development',
      defaults: '.env',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};

const productionConfig = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: '.env.production',
      defaults: '.env',
    }),
  ],
  optimization: {
    splitChunks: { chunks: 'all' },
  },
};

const statsConfig = {
  plugins: [new BundleAnalyzerPlugin()],
};

module.exports = (env) => {
  if (env.development) {
    return merge(commonConfig, developmentConfig);
  } else if (env.production) {
    return merge(commonConfig, productionConfig);
  } else if (env.stats) {
    return merge(commonConfig, productionConfig, statsConfig);
  }

  throw new Error('No matching configuration was found!');
};
