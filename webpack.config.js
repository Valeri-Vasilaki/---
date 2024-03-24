const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "index.ts"),
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    static: [{
      directory: path.join(__dirname, "dist"),
    },
    {
      directory: path.join(__dirname, "assets"),
    },  
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
      },
    ],
  },
};
