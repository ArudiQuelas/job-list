const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: ["style-loader", {
              loader: "css-loader",
              options: {
                modules: true,
              },
            }, "sass-loader"],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
          }
        ]
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],
    output: {
      path: path.resolve(__dirname, "build")
    }
};