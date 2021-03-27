const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  entry: path.resolve(__dirname, "./src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
    }),
  ],
};

const developmentConfig = {
  mode: "development",
  devtool: "cheap-module-source-map",
  plugins: [
    new Dotenv({
      path: ".env.development",
      defaults: ".env",
    }),
  ],
};

const productionConfig = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new Dotenv({
      path: ".env.production",
      defaults: ".env",
    }),
  ],
};

module.exports = (env) => {
  if (env.development) {
    return merge(commonConfig, developmentConfig);
  } else if (env.production) {
    return merge(commonConfig, productionConfig);
  }

  throw new Error("No matching configuration was found!");
};
