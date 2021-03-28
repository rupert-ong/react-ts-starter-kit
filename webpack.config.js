const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

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

const getDevelopmentConfig = (ie11 = false) => ({
  mode: "development",
  target: ie11 ? "browserslist" : "web",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: ie11 ? false : true,
    open: true,
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new Dotenv({
      path: ".env.development",
      defaults: ".env",
    }),
    !ie11 && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
});

const productionConfig = {
  mode: "production",
  target: "browserslist",
  devtool: "source-map",
  plugins: [
    new Dotenv({
      path: ".env.production",
      defaults: ".env",
    }),
  ],
};

const statsConfig = {
  plugins: [new BundleAnalyzerPlugin()],
};

module.exports = (env) => {
  if (env.development) {
    return merge(commonConfig, getDevelopmentConfig(env.ie11));
  } else if (env.production) {
    return merge(commonConfig, productionConfig);
  } else if (env.stats) {
    return merge(commonConfig, productionConfig, statsConfig);
  }

  throw new Error("No matching configuration was found!");
};
