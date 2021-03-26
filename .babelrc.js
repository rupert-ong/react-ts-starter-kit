const isProd = String(process.env.NODE_ENV) === "production";
const isTest = String(process.env.NODE_ENV) === "test";

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: 3,
        debug: true,
        modules: isTest ? "commonjs" : false,
        useBuiltIns: "usage",
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
