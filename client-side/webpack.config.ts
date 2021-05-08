import path from "path";
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const webpackConfig = ():Configuration => {
  return {
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "eval",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: [/dist/, /node_modules/],
        },
        {
          test: /\.(png|jpeg|svg|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
          exclude: [/dist/, /node_modules/],
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          exclude: [/dist/, /node_modules/],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, "/public/index.html"),
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [
        new TsconfigPathsPlugin({
            extensions: ['.ts', '.tsx', '.js', '.css', '.module.css'],
        }),
    ],
    },
  };
};

export default webpackConfig;
