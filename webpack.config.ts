import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const DEVELOPMENT = "development";
const PRODUCTION = "production";

let mode = DEVELOPMENT;
let devtool = "eval-source-map";

if (mode === PRODUCTION) {
  mode = PRODUCTION;
  devtool = "source-map";
}

module.exports = {
  mode: mode,

  output: {
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      { test: /\.(png|jpe?g|gif|svg)$/i, type: "asset" },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      failOnError: false,
      failOnWarning: false,
      emitWarning: true,
      // emitError: false,
    }),
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"],
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  devtool: devtool,

  devServer: {
    static: path.join(__dirname, "build"),
    hot: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
