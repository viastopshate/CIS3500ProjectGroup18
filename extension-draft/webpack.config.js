const HTMLPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    landingpage: "./src/landing-page/index.js",
    popup: "./src/popup/index.js"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/inline' // This will inline all matched assets as Data UR
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
  },
  plugins: [
    /* Necessary to use HTMLPlugin to inject the bundle into the index.html */
    new HTMLPlugin({
      template: "./public/index.html",
      filename: "index.html",
      chunks: ["landingpage"],
    }),
    new HTMLPlugin({
      template: "./public/popup.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: "",
          globOptions: {
            ignore: ["**/index.html", "**/popup.html"], // This line excludes index.html
          },
        },
      ],
    }),
  ],
};
